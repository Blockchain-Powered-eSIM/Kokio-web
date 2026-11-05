import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const HUBS_DIR = path.join(process.cwd(), "content/hubs");

/** A hand-written topic page, such as /no-kyc-esim, served at the site root. */
export interface Hub {
  slug: string;
  path: string;
  title: string;
  /** Shorter page title for search results, when the H1 is too long for one. */
  seoTitle: string;
  description: string;
  /** Last substantive edit. Read by the sitemap. */
  updated: Date;
  faqs: Array<{ id: string; question: string; answer: string }>;
  content: string;
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  seoTitle: z.string().min(1).optional(),
  description: z.string().min(1),
  updated: z.coerce.date(),
  faqs: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        question: z.string().min(1),
        answer: z.string().min(1),
      })
    )
    .default([]),
});

function loadHub(slug: string): Hub {
  const file = path.join(HUBS_DIR, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new Error(
      `Invalid frontmatter in content/hubs/${slug}.mdx: ${issues}`
    );
  }

  const { seoTitle, ...frontmatter } = result.data;
  return {
    slug,
    path: `/${slug}`,
    seoTitle: seoTitle ?? frontmatter.title,
    ...frontmatter,
    content,
  };
}

/** Every hub, A to Z by slug. Each one also needs its own folder under app/. */
export function getAllHubs(): Hub[] {
  return fs
    .readdirSync(HUBS_DIR)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => loadHub(filename.replace(/\.mdx$/, "")))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getHub(slug: string): Hub {
  return loadHub(slug);
}
