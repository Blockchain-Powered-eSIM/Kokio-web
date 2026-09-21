#!/usr/bin/env node

/**
 * Checks the built site against the things agents and crawlers rely on.
 *
 * Blog posts look after themselves: every surface reads from getAllPosts(), so
 * a new MDX file lands everywhere at once. A new page does not. app/sitemap.ts
 * lists routes by hand, and a page missing from it is missing from the sitemap,
 * both text files and the .md routes with nothing to say so. That is what this
 * catches. Everything else here was checked by hand once and is cheap to keep.
 *
 * Run after `next build`, from the project root.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const APP = ".next/server/app";
const MANIFEST = ".next/app-path-routes-manifest.json";
const ORIGIN = "https://kokio.app";

/** Deliberately outside the sitemap. Each entry needs a reason. */
const NOT_INDEXED = {
  "/moonpay-return": "payment callback, noindex, meaningless without the transaction",
};

/** Routes with no prerendered output to look at. Not a gap, just not static. */
const DYNAMIC_ROUTES = new Set(["/blogs/rss.xml"]);

const failures = [];
const warnings = [];

function fail(check, message) {
  failures.push(`${check}: ${message}`);
}

function warn(check, message) {
  warnings.push(`${check}: ${message}`);
}

function read(file) {
  return readFileSync(join(APP, file), "utf8");
}

function exists(file) {
  return existsSync(join(APP, file));
}

/** `/` lives at index.html, everything else at its own path. */
function htmlFile(pathname) {
  return pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;
}

function rawFile(pathname) {
  return pathname === "/" ? "raw/index.body" : `raw${pathname}.body`;
}

/** Turns `/blog/[slug]` and `/raw/[...path]` into something testable. */
function routeToPattern(route) {
  const source = route
    .replace(/\[\.\.\.[^\]]+\]/g, "@@REST@@")
    .replace(/\[[^\]]+\]/g, "@@ONE@@")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/@@REST@@/g, ".+")
    .replace(/@@ONE@@/g, "[^/]+");
  return new RegExp(`^${source}$`);
}

const routes = Object.entries(JSON.parse(readFileSync(MANIFEST, "utf8")));
const pageRoutes = routes
  .filter(([key]) => key.endsWith("/page"))
  .map(([, route]) => route)
  .filter((route) => !route.startsWith("/_"));
const allRoutes = routes.map(([, route]) => route);

const sitemapPaths = [...read("sitemap.xml.body").matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname)
  .map((pathname) => (pathname === "" ? "/" : pathname));

const llms = read("llms.txt.body");
const llmsFull = read("llms-full.txt.body");
const robots = read("robots.txt.body");

// 1. Every page is either in the sitemap or explicitly excluded.
for (const route of pageRoutes) {
  if (route in NOT_INDEXED) continue;

  const covered = route.includes("[")
    ? sitemapPaths.some((pathname) => routeToPattern(route).test(pathname))
    : sitemapPaths.includes(route);

  if (!covered) {
    fail(
      "sitemap",
      `${route} has a page but no sitemap entry. Add it to app/sitemap.ts, or to NOT_INDEXED here with a reason.`
    );
  }
}

// 2. Every sitemap URL has text an agent can read, in both forms.
for (const pathname of sitemapPaths) {
  if (!llmsFull.includes(`\n# ${pathname}\n`)) {
    fail("llms-full", `${pathname} is in the sitemap but has no section. Add it to lib/site-text.ts.`);
  }
  if (!exists(rawFile(pathname))) {
    fail("markdown", `${pathname} has no .md output. Add it to lib/site-text.ts.`);
  }
}

// 3. Links written for agents have to resolve, since nothing retries a 404.
const linked = new Set(
  [...`${llms}\n${llmsFull}`.matchAll(/https:\/\/kokio\.app(\/[^\s)]*)/g)].map(
    (match) => match[1]
  )
);

for (const link of linked) {
  const target = link.replace(/[.,]$/, "");
  const resolved = target.endsWith(".md")
    ? rawFile(target.slice(0, -3))
    : null;

  if (resolved) {
    if (!exists(resolved)) fail("links", `${target} is linked but was not built.`);
    continue;
  }

  const known =
    allRoutes.includes(target) ||
    DYNAMIC_ROUTES.has(target) ||
    allRoutes.some((route) => route.includes("[") && routeToPattern(route).test(target));

  if (!known) fail("links", `${target} is linked but is not a route.`);
}

// 4. A schema reference pointing at nothing is worse than no reference.
for (const pathname of sitemapPaths) {
  const html = read(htmlFile(pathname));
  const domIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map((match) => match[1]));

  const nodes = [...html.matchAll(/type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(
    (match) => {
      const parsed = JSON.parse(match[1]);
      return parsed["@graph"] ?? [parsed];
    }
  );

  const defined = new Set(nodes.map((node) => node["@id"]).filter(Boolean));
  const referenced = [...JSON.stringify(nodes).matchAll(/\{"@id":"([^"]+)"\}/g)].map(
    (match) => match[1]
  );

  for (const id of referenced) {
    if (defined.has(id)) continue;

    const fragment = id.split("#")[1];
    if (fragment && domIds.has(fragment)) continue;

    fail("schema", `${pathname} references @id ${id}, which nothing defines and no element matches.`);
  }

  // An answer or a definition has an @id so a citation can point at that one
  // item, so unlike the entity ids around it, it has to name something on the
  // page. Everything a set holds is checked, not the set itself.
  const items = nodes.flatMap((node) => node.mainEntity ?? node.hasDefinedTerm ?? []);

  for (const item of items) {
    const fragment = String(item["@id"] ?? "").split("#")[1];
    if (!fragment || !domIds.has(fragment)) {
      fail("schema", `${pathname} puts "${item.name}" at ${item["@id"]}, but no element has that id.`);
    }
  }
}

// 5. Both ways of reading a page have to be discoverable from the page itself.
for (const pathname of sitemapPaths) {
  const html = read(htmlFile(pathname));
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

  if (canonical !== new URL(pathname, ORIGIN).href.replace(/\/$/, "")) {
    fail("canonical", `${pathname} has canonical ${canonical ?? "(none)"}.`);
  }
  if (!html.includes('type="text/markdown"')) {
    fail("markdown", `${pathname} does not link its own .md version.`);
  }
}

// 6. Groups in robots.txt are independent, so a disallow stated once is stated
//    only for the wildcard and every named crawler is still free to fetch it.
const groups = robots.split(/\n(?=User-[Aa]gent:)/).filter(Boolean);
const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)$/gm)].map((match) => match[1]);
const expected = new Set(disallowed);

if (!robots.includes("User-Agent: *")) fail("robots", "no wildcard group.");

for (const group of groups) {
  const agent = group.match(/User-[Aa]gent:\s*(\S+)/)?.[1] ?? "(unknown)";
  for (const path of expected) {
    if (!group.includes(`Disallow: ${path}`)) {
      fail("robots", `${agent} is not disallowed from ${path}, but other agents are.`);
    }
  }
}

// 7. Dates that say nothing changed when something did. Warn only: the fix is a
//    judgement call about whether an edit was substantive.
/** Compared by day: a lastmod is a date, and the commit behind it has a clock time. */
function day(date) {
  return date.toISOString().slice(0, 10);
}

function lastCommit(paths) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
    }).trim();
    return out ? new Date(out) : null;
  } catch {
    return null;
  }
}

const lastmod = new Map(
  [...read("sitemap.xml.body").matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)</g)].map(
    ([, url, date]) => [new URL(url).pathname, new Date(date)]
  )
);

const home = lastmod.get("/");
const homeTouched = lastCommit([
  "components/hero.tsx",
  "components/setup.tsx",
  "components/features.tsx",
  "content/faqs.ts",
  "lib/site-copy.ts",
]);

if (homeTouched && home && day(homeTouched) > day(home)) {
  warn(
    "freshness",
    `landing copy changed on ${day(homeTouched)} but HOME_UPDATED still says ${day(home)}.`
  );
}

const legalTouched = lastCommit(["content/legal"]);
const legalStamp = lastmod.get("/terms-of-service");

if (legalTouched && legalStamp && day(legalTouched) > day(legalStamp)) {
  warn(
    "freshness",
    `legal text changed on ${day(legalTouched)} but lastUpdatedIso still says ${day(legalStamp)}.`
  );
}

// Contract text that has outrun its last legal review. Read from source rather
// than the build, because the date is a fact about the documents and never
// reaches a page.
const reviewed = readFileSync("config/legal.ts", "utf8").match(
  /counselReviewedIso:\s*"(\d{4}-\d{2}-\d{2})"/
)?.[1];

if (!reviewed) {
  fail("legal", "config/legal.ts has no counselReviewedIso. It is what says the documents have been read.");
} else if (legalTouched && day(legalTouched) > reviewed) {
  warn(
    "legal",
    `legal text changed on ${day(legalTouched)}, after the last counsel review on ${reviewed}. Send the change to counsel, then move counselReviewedIso.`
  );
}

for (const message of warnings) console.warn(`warning  ${message}`);
for (const message of failures) console.error(`FAIL     ${message}`);

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}

console.log(
  `Site checks passed. ${pageRoutes.length} pages, ${sitemapPaths.length} sitemap URLs, ${linked.size} agent-facing links.` +
    (warnings.length ? ` ${warnings.length} warning(s).` : "")
);
