import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

import { BLOG_TAGS, type BlogTag } from "@/config/site";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const AUTHORS_DIR = path.join(process.cwd(), "content/authors");

export interface Author {
  slug: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  twitter?: string;
}

export interface PostReadingTime {
  text: string;
  minutes: number;
  words: number;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: Date;
  /** Last substantive edit. Falls back to `date` when the post has not been revised. */
  updated: Date;
  author: Author;
  tag: BlogTag;
  hero: string;
  ogImage?: string;
  tldr: string[];
  draft: boolean;
  content: string;
  readingTime: PostReadingTime;
}

const authorSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().min(1),
  bio: z.string(),
  role: z.string().min(1),
  twitter: z.string().url().optional(),
});

const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string().min(1),
  tag: z.enum(BLOG_TAGS),
  hero: z.string().min(1),
  ogImage: z.string().min(1).optional(),
  tldr: z.array(z.string().min(1)).min(1),
  draft: z.boolean().default(false),
});

function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
    .join("; ");
}

function loadAuthors(): Map<string, Author> {
  const authors = new Map<string, Author>();
  const filenames = fs.existsSync(AUTHORS_DIR)
    ? fs
        .readdirSync(AUTHORS_DIR)
        .filter((filename) => filename.endsWith(".json"))
    : [];

  for (const filename of filenames) {
    const slug = filename.replace(/\.json$/, "");
    const raw = JSON.parse(
      fs.readFileSync(path.join(AUTHORS_DIR, filename), "utf8")
    );

    const result = authorSchema.safeParse(raw);
    if (!result.success) {
      throw new Error(
        `Invalid author in content/authors/${filename}: ${formatZodError(result.error)}`
      );
    }

    authors.set(slug, { slug, ...result.data });
  }

  return authors;
}

function isPublished(post: Pick<Post, "draft" | "date">): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return !post.draft && post.date.getTime() <= Date.now();
}

function loadPosts(): Post[] {
  const authors = loadAuthors();
  const filenames = fs.existsSync(BLOG_DIR)
    ? fs.readdirSync(BLOG_DIR).filter((filename) => filename.endsWith(".mdx"))
    : [];

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error(
        `Invalid post filename "${filename}". Expected kebab-case slug characters only (lowercase letters, numbers, and hyphens).`
      );
    }
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
    const { data, content } = matter(raw);

    const result = frontmatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in content/blog/${filename}: ${formatZodError(result.error)}`
      );
    }

    const frontmatter = result.data;
    const author = authors.get(frontmatter.author);
    if (!author) {
      throw new Error(
        `content/blog/${filename} references unknown author "${frontmatter.author}" - add content/authors/${frontmatter.author}.json`
      );
    }

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: frontmatter.date,
      updated: frontmatter.updated ?? frontmatter.date,
      author,
      tag: frontmatter.tag,
      hero: frontmatter.hero,
      ogImage: frontmatter.ogImage,
      tldr: frontmatter.tldr,
      draft: frontmatter.draft,
      content,
      readingTime: readingTime(content),
    } satisfies Post;
  });

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

/** Published posts only (excludes drafts and future-dated posts in production), sorted newest first. */
export function getAllPosts(): Post[] {
  return loadPosts().filter(isPublished);
}

/** Looks up a single post by slug regardless of publish status, so draft links stay previewable. */
export function getPost(slug: string): Post | null {
  return loadPosts().find((post) => post.slug === slug) ?? null;
}

/** Same-tag posts first, backfilled with the next most recent posts, current post excluded. */
export function getRelatedPosts(slug: string, limit = 2): Post[] {
  const post = getPost(slug);
  if (!post) return [];

  const others = getAllPosts().filter((p) => p.slug !== slug);
  const sameTag = others.filter((p) => p.tag === post.tag);
  const rest = others.filter((p) => p.tag !== post.tag);

  return [...sameTag, ...rest].slice(0, limit);
}

export function getAllAuthors(): Author[] {
  return Array.from(loadAuthors().values());
}

export function getAuthor(slug: string): Author | null {
  return loadAuthors().get(slug) ?? null;
}
