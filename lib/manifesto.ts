import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const MANIFESTO_PATH = path.join(process.cwd(), "content/manifesto.mdx");

export interface Manifesto {
  title: string;
  description: string;
  ogHeadline?: string;
  /** Last substantive edit, used for sitemap lastmod. */
  updated: Date;
  tldr: string[];
  content: string;
}

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogHeadline: z.string().min(1).optional(),
  updated: z.coerce.date(),
  tldr: z.array(z.string().min(1)).min(1),
});

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("; ");
}

/** Loads the single standalone manifesto document (not part of the blog collection, see D7). */
export function getManifesto(): Manifesto {
  if (!fs.existsSync(MANIFESTO_PATH)) {
    throw new Error(
      "content/manifesto.mdx not found. Add the manifesto content at content/manifesto.mdx."
    );
  }

  const raw = fs.readFileSync(MANIFESTO_PATH, "utf8");
  const { data, content } = matter(raw);

  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in content/manifesto.mdx: ${formatZodError(result.error)}`
    );
  }

  return {
    title: result.data.title,
    description: result.data.description,
    ogHeadline: result.data.ogHeadline,
    updated: result.data.updated,
    tldr: result.data.tldr,
    content,
  };
}
