import type { RegulatoryNote as Note } from "@/lib/esim/types";

/** A sourced legal claim, with its sources linked inline. */
export function RegulatoryNote({
  note,
  label,
}: {
  note: Note;
  label?: string;
}) {
  return (
    <p>
      {label ? <strong className="font-medium">{label}: </strong> : null}
      {note.text}{" "}
      <span className="text-base text-esim-black-700">
        (Sources:{" "}
        {note.sources.map((source, index) => (
          <span key={source.url}>
            {index > 0 ? ", " : null}
            <a
              href={source.url}
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {source.label}
            </a>
          </span>
        ))}
        )
      </span>
    </p>
  );
}
