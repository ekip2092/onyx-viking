import type { CSSProperties, ReactNode } from "react";

export function Eyebrow({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <p className="eyebrow" style={style}>
      {children}
    </p>
  );
}
