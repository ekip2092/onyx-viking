"use client";

import { useId, useState, type ChangeEventHandler, type CSSProperties } from "react";

type InputProps = {
  label?: string;
  tone?: "dark" | "light";
  type?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  inputMode?: "text" | "numeric" | "tel" | "email";
  style?: CSSProperties;
};

/* Corsa DS text field: 4px radius (the one place softening is allowed),
   hairline border that shifts to Rosso Corsa on focus. */
export function Input({
  label,
  tone = "dark",
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  inputMode,
  style,
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const onLight = tone === "light";
  const inputId = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xxs)", width: "100%" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-family)",
            fontSize: "var(--type-caption-uppercase-size)",
            fontWeight: 600,
            letterSpacing: "var(--type-caption-uppercase-tracking)",
            textTransform: "uppercase",
            color: onLight ? "var(--color-muted)" : "var(--color-body)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: "48px",
          padding: "14px 16px",
          boxSizing: "border-box",
          borderRadius: "var(--radius-sm)",
          backgroundColor: onLight ? "var(--color-canvas-light)" : "var(--color-canvas)",
          color: onLight ? "var(--color-body-on-light)" : "var(--color-ink)",
          border: `1px solid ${
            focused
              ? "var(--color-primary)"
              : onLight
                ? "var(--color-hairline-on-light)"
                : "var(--color-hairline)"
          }`,
          fontFamily: "var(--font-family)",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 120ms ease",
          ...style,
        }}
      />
    </div>
  );
}
