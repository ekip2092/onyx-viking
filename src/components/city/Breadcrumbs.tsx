import Link from "next/link";

/* Visible breadcrumb trail. Pair with breadcrumbJsonLd for the schema. */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="wrap" style={{ padding: "var(--space-md) var(--space-lg) 0" }}>
      <ol
        className="list-reset"
        style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", fontSize: "12px", letterSpacing: "0.3px" }}
      >
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {it.href && !last ? (
                <Link href={it.href} style={{ color: "var(--color-body)", textDecoration: "none" }}>
                  {it.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} style={{ color: last ? "var(--color-ink)" : "var(--color-body)" }}>
                  {it.name}
                </span>
              )}
              {!last ? <span aria-hidden="true" style={{ color: "var(--color-muted)" }}>›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
