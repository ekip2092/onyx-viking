import Link from "next/link";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { MobileMenu } from "./MobileMenu";

/* Sticky top nav: 72px, translucent near-black with backdrop blur,
   bottom hairline. Center links hide < 1040px; phone hides < 540px. */
export function Nav({ active }: { active?: string }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: "72px",
        // Solid-ish bg (no backdrop-filter: it clips the CTA's hover shadow).
        background: "rgba(22,22,22,0.97)",
        borderBottom: "1px solid var(--color-hairline)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 var(--space-lg)",
      }}
    >
      <Link
        href={SITE.home}
        style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", textDecoration: "none" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/onyx-mark.svg" alt="" style={{ height: "36px", width: "36px" }} />
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              color: "var(--color-ink)",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Onyx
          </span>
          <span
            style={{
              color: "var(--color-body)",
              fontSize: "9.5px",
              fontWeight: 600,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              marginTop: "3px",
            }}
          >
            Viking Appliance Repair
          </span>
        </span>
      </Link>

      <nav className="nav-links">
        {SITE.pages.map((p) => (
          <Link
            key={p.id}
            href={p.href}
            className={"nav-link" + (active === p.id ? " active" : "")}
            style={{
              fontFamily: "var(--font-family)",
              fontSize: "var(--type-nav-link-size)",
              fontWeight: 600,
              letterSpacing: "var(--type-nav-link-tracking)",
              textTransform: "uppercase",
              textDecoration: "none",
              color: active === p.id ? "var(--color-ink)" : "var(--color-body)",
            }}
          >
            {p.label}
          </Link>
        ))}
      </nav>

      <div className="nav-right">
        <a
          className="nav-phone"
          href={"tel:" + SITE.phoneTel}
          style={{
            alignItems: "center",
            gap: "var(--space-xxs)",
            textDecoration: "none",
            color: "var(--color-ink)",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.3px",
            whiteSpace: "nowrap",
          }}
        >
          <PhoneIcon size={16} /> {SITE.phoneDisplay}
        </a>
        <span className="nav-cta">
          <Button variant="primary" size="sm" href={"tel:" + SITE.phoneTel}>
            {SITE.ctaLabel}
          </Button>
        </span>
        <MobileMenu active={active} />
      </div>
    </header>
  );
}
