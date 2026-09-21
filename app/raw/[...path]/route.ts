import { siteConfig } from "@/config/site";
import { pageSections } from "@/lib/site-text";

export const dynamic = "force-static";
export const dynamicParams = false;

/** `/index.md` is the home page, since `/.md` is not a URL anyone can request. */
const HOME_SEGMENT = "index";

function toPathname(segments: string[]): string {
  const joined = segments.join("/");
  return joined === HOME_SEGMENT ? "/" : `/${joined}`;
}

export function generateStaticParams() {
  return Object.keys(pageSections()).map((pathname) => ({
    path: pathname === "/" ? [HOME_SEGMENT] : pathname.slice(1).split("/"),
  }));
}

/**
 * Serves one page as markdown. Reached through the `/:path*.md` rewrite in
 * next.config.ts, so `/blog/<slug>.md` lands here rather than at a real file.
 *
 * Roughly 4 KB of prose against 90 KB of markup and Tailwind classes for the
 * same page. An agent working to a context budget gets more of the site.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathname = toPathname(path);
  const render = pageSections()[pathname];

  if (!render) {
    return new Response("Not found\n", { status: 404 });
  }

  const source = new URL(pathname, siteConfig.url).href;
  const body = `> Markdown rendering of ${source}\n\n${render()}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
