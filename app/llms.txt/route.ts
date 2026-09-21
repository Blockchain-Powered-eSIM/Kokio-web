import { siteConfig, TWITTER_URL } from "@/config/site";
import { legalConfig } from "@/config/legal";
import { getAllPosts } from "@/lib/blog";
import {
  CANONICAL_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_NAME_SPELLINGS,
} from "@/lib/site-copy";

export const dynamic = "force-static";

const DOCS_URL = "https://docs.kokio.app";
const CONTRACTS_URL =
  "https://github.com/Blockchain-Powered-eSIM/smart-contract-suite";

function absolute(path: string): string {
  return new URL(path, siteConfig.url).href;
}

function link(label: string, path: string, summary: string): string {
  return `- [${label}](${absolute(path)}): ${summary}`;
}

/**
 * Plain-text summary of the site for agents, following the llms.txt convention:
 * one H1, one blockquote, then H2 sections of annotated links.
 *
 * Built from the same modules the pages render from, so it cannot fall behind
 * them. Only list URLs that exist; a 404 here costs more than a missing entry.
 */
export function GET() {
  const posts = getAllPosts();

  const body = `# ${PRODUCT_NAME}

> ${CANONICAL_DESCRIPTION}

${PRODUCT_NAME} is also written ${PRODUCT_NAME_SPELLINGS.join(", ")}. Every one of those spellings refers to this product, this website and this app. ${PRODUCT_NAME} is built by ${legalConfig.companyLegalName} (Singapore, UEN ${legalConfig.uen}). Technical documentation and the smart contract reference are at ${DOCS_URL}.

## Product
${link("Home", "/", "what Kokio is, how setup works, features, and the FAQ")}
${link("Manifesto", "/manifesto", "why Kokio treats connectivity as a right and privacy as its guardian")}
${link("Glossary", "/glossary", "eSIM, eUICC, SM-DP+, LPA, passkey, smart wallet and no-KYC defined")}

## Guides
${posts.map((post) => link(post.title, `/blogs/${post.slug}`, post.description)).join("\n")}

## Reference
- [Documentation](${DOCS_URL}): architecture, mobile app flow, smart contract suite
- [Smart contracts](${CONTRACTS_URL}): open source wallet contract suite
- [X](${TWITTER_URL}): announcements
${link("Full text", "/llms-full.txt", "every page of this site as one markdown file")}

Any page on this site is also readable as markdown by adding .md to its URL, for example ${absolute("/blogs/where-your-sim-data-goes.md")}. The home page is ${absolute("/index.md")}.

## Legal
${link("Terms of Service", "/terms-of-service", "terms governing use of the app")}
${link("Privacy Policy", "/privacy-policy", "what Kokio does and does not collect")}

## Optional
${link("Blog index", "/blogs", "all posts")}
${link("RSS", "/blogs/rss.xml", "post feed")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
