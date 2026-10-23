import sitemap from "@/app/sitemap";
import { siteConfig } from "@/config/site";
import { PRODUCT_NAME } from "@/lib/site-copy";
import { pageSections } from "@/lib/site-text";

export const dynamic = "force-static";

/** Every page as one file, one section per sitemap.xml entry; a sitemap page with no text here fails the build. */
export function GET() {
  const sections = pageSections();

  const body = sitemap().map(({ url }) => {
    const { pathname } = new URL(url);
    const render = sections[pathname];
    if (!render) {
      throw new Error(
        `llms-full.txt has no section for ${pathname}. Add one in lib/site-text.ts or drop the page from the sitemap.`
      );
    }
    return `# ${pathname}\n\n${render()}`;
  });

  const header = [
    `# ${PRODUCT_NAME}: full site text`,
    `> Every page of ${siteConfig.url} as one markdown file. Each section below is headed by the path it was rendered from. Any single page is also available on its own by adding .md to its URL.`,
  ].join("\n\n");

  return new Response(`${header}\n\n---\n\n${body.join("\n\n---\n\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
