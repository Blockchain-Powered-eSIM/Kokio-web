import type { ReactNode } from "react";

export function DeviceFrame({
  sourceTag,
  children,
}: {
  sourceTag: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="src-tag">{sourceTag}</div>
      <div className="stage">
        <div className="phone">{children}</div>
      </div>
    </div>
  );
}
