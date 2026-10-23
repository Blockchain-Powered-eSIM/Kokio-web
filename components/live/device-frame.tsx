import type { ReactNode } from "react";

export function DeviceFrame({
  sourceTag,
  caption,
  children,
}: {
  sourceTag: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="src-tag">{sourceTag}</div>
      {caption && <p className="demo-caption">{caption}</p>}
      <div className="stage">
        <div className="phone">{children}</div>
      </div>
    </div>
  );
}
