"use client";

import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";

type Variant = "primary" | "outline" | "tertiary";
type Tone = "dark" | "light";
type Size = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
};

/* Faithful port of the Corsa DS Button: sharp 0px corners, uppercase
   tracked label, primary darkens to --color-primary-active on press.
   No invented hover color shifts (per the design system's no-hover policy). */
export function Button({
  children,
  variant = "primary",
  tone = "dark",
  size = "md",
  disabled = false,
  href,
  onClick,
  type = "button",
  style,
}: ButtonProps) {
  const [pressed, setPressed] = useState(false);
  const onLight = tone === "light";

  const base: CSSProperties = {
    fontFamily: "var(--font-family)",
    fontSize: "var(--type-button-size)",
    fontWeight: 700,
    letterSpacing: "var(--type-button-tracking)",
    lineHeight: 1,
    textTransform: "uppercase",
    textDecoration: "none",
    borderRadius: "var(--radius-none)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-xxs)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const sizing: CSSProperties =
    size === "sm"
      ? { height: "40px", padding: "0 var(--space-sm)" }
      : { height: "48px", padding: "0 var(--space-md)" };

  let variantStyle: CSSProperties;
  if (variant === "primary") {
    variantStyle = {
      backgroundColor: pressed ? "var(--color-primary-active)" : "var(--color-primary)",
      color: "var(--color-on-primary)",
      border: "1px solid transparent",
    };
  } else if (variant === "outline") {
    variantStyle = {
      backgroundColor: "transparent",
      color: onLight ? "var(--color-body-on-light)" : "var(--color-ink)",
      border: `1px solid ${onLight ? "var(--color-body-on-light)" : "var(--color-ink)"}`,
    };
  } else {
    variantStyle = {
      backgroundColor: "transparent",
      color: onLight ? "var(--color-body-on-light)" : "var(--color-ink)",
      border: "1px solid transparent",
      padding: 0,
      height: "auto",
    };
  }

  const composed: CSSProperties = { ...base, ...sizing, ...variantStyle, ...style };

  const pressHandlers = disabled
    ? {}
    : {
        onMouseDown: () => setPressed(true),
        onMouseUp: () => setPressed(false),
        onMouseLeave: () => setPressed(false),
      };

  if (href && !disabled) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="onyx-btn" style={composed} {...pressHandlers}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className="onyx-btn" style={composed} {...pressHandlers}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className="onyx-btn" style={composed} {...pressHandlers}>
      {children}
    </button>
  );
}
