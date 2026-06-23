export function Stars({
  size = 14,
  color = "var(--color-primary)",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      role="img"
      style={{ display: "inline-flex", gap: 3 }}
      aria-label="5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={color}
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}
