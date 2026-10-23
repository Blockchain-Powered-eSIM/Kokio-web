// Domain model for long-form legal documents (Terms of Service, Privacy Policy etc.)

export type Inline = string | InlineNode[];

// A single span within an {@link Inline} run. `type` is the discriminant.
export type InlineNode =
  | InlineText
  | InlineStrong
  | InlineExternalLink
  | InlineMailLink
  | InlineInternalLink;

export interface InlineText {
  type: "text";
  value: string;
}

export interface InlineStrong {
  type: "strong";
  value: string;
}

export interface InlineExternalLink {
  type: "external";
  text: string;
  href: string;
}

export interface InlineMailLink {
  type: "mail";
  email: string; // e-mail address only
  text?: string; // Optional hover label
}

export interface InlineInternalLink {
  type: "internal";
  text: string;
  href: string;
}

export type Block = ParagraphBlock | ListBlock | SubsectionBlock;
export type SubsectionChild = ParagraphBlock | ListBlock;

export interface ParagraphBlock {
  type: "paragraph";
  content: Inline;
}

export interface ListBlock {
  type: "list";
  ordered: boolean;
  items: Inline[];
}

export interface SubsectionBlock {
  type: "subsection";
  id?: string;
  heading: string;
  blocks: SubsectionChild[];
}

export interface LegalSection {
  id?: string; // Optional anchor-id override
  heading: string;
  blocks: Block[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  effective: string;
  sections: LegalSection[];
}
