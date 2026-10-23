import type { Root, Element, RootContent } from "hast";

/** Pillar section slugs → Roman numeral, keyed by rehype-slug id. */
export const PILLAR_NUMERALS: Record<string, string> = {
  "privacy-is-personal-political-and-programmable": "I",
  "from-consumers-to-citizens": "II",
  "infrastructure-not-interference": "III",
  "no-backdoors-no-middlemen": "IV",
};

const MORAL_ID = "moral";
const ACKNOWLEDGMENT_ID = "acknowledgment";
const REFERENCES_ID = "ideology-and-motivations-references";

function isHeading(node: RootContent): node is Element {
  return node.type === "element" && node.tagName === "h2";
}

function isSectionBoundary(node: RootContent): boolean {
  return (
    node.type === "element" &&
    (node.tagName === "h2" || node.tagName.startsWith("manifesto-"))
  );
}

function findHeadingIndex(children: RootContent[], id: string): number {
  return children.findIndex(
    (node) => isHeading(node) && node.properties?.id === id
  );
}

function sectionEnd(children: RootContent[], start: number): number {
  let end = start + 1;
  while (end < children.length && !isSectionBoundary(children[end])) {
    end++;
  }
  return end;
}

function wrapSection(children: RootContent[], id: string, tagName: string) {
  const start = findHeadingIndex(children, id);
  if (start === -1) return;

  const end = sectionEnd(children, start);
  const wrapper: Element = {
    type: "element",
    tagName,
    properties: {},
    children: children.slice(start, end) as Element["children"],
  };
  children.splice(start, end - start, wrapper);
}

function insertAfterSection(
  children: RootContent[],
  id: string,
  tagName: string
) {
  const start = findHeadingIndex(children, id);
  if (start === -1) return;

  const end = sectionEnd(children, start);
  const marker: Element = {
    type: "element",
    tagName,
    properties: {},
    children: [],
  };
  children.splice(end, 0, marker);
}

/**
 * Runs after rehype-slug. Wraps the Moral and References sections into
 * custom elements (mapped to components in
 * components/manifesto/mdx-components.tsx) and inserts a signature-block
 * marker right after Acknowledgment — all keyed by heading id, not position.
 */
export function rehypeManifestoSections() {
  return (tree: Root) => {
    wrapSection(tree.children, MORAL_ID, "manifesto-moral");
    wrapSection(tree.children, REFERENCES_ID, "manifesto-references");
    insertAfterSection(tree.children, ACKNOWLEDGMENT_ID, "manifesto-signature");
  };
}
