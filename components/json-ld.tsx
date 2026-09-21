/**
 * Renders a schema.org graph as a JSON-LD script tag.
 *
 * The content is ours, not user input, so serialising it straight into the tag
 * is safe. Keep it that way: never pass anything a visitor can influence.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
