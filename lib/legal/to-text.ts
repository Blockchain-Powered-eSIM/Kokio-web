import type {
  Block,
  Inline,
  LegalDocument,
  SubsectionChild,
} from "@/lib/legal/types";

/**
 * Renders a legal document as markdown for the plain-text routes.
 *
 * Links keep their text and drop their href. An agent reading this file already
 * has the whole site in front of it, so a URL adds nothing and the anchor text
 * usually carries the meaning on its own.
 */
function inlineToText(inline: Inline): string {
  if (typeof inline === "string") return inline;

  return inline
    .map((node) => {
      switch (node.type) {
        case "text":
          return node.value;
        case "strong":
          return `**${node.value}**`;
        case "mail":
          return node.text ?? node.email;
        default:
          return node.text;
      }
    })
    .join("");
}

function blockToText(block: Block | SubsectionChild): string {
  switch (block.type) {
    case "paragraph":
      return inlineToText(block.content);
    case "list":
      return block.items
        .map(
          (item, index) =>
            `${block.ordered ? `${index + 1}.` : "-"} ${inlineToText(item)}`
        )
        .join("\n");
    case "subsection":
      return [
        `#### ${block.heading}`,
        ...block.blocks.map((child) => blockToText(child)),
      ].join("\n\n");
  }
}

export function legalDocumentToText(document: LegalDocument): string {
  const body = document.sections.map((section) =>
    [
      `### ${section.heading}`,
      ...section.blocks.map((block) => blockToText(block)),
    ].join("\n\n")
  );

  return [
    `Effective ${document.effective}. Last updated ${document.lastUpdated}.`,
    ...body,
  ].join("\n\n");
}
