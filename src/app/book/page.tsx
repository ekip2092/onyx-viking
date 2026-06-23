import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Shell } from "@/components/layout/Shell";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BookForm } from "@/components/sections/BookForm";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Reserve a Viking diagnostic visit. A flat $95 diagnostic, credited in full toward your repair. Factory trained technician to your door.",
  alternates: { canonical: "/book" },
};

function BookHeader() {
  return (
    <section style={{ background: "var(--color-canvas)", borderBottom: "1px solid var(--color-hairline)" }}>
      <Reveal className="wrap" style={{ padding: "var(--space-super) var(--space-lg) var(--space-xl)" }}>
        <Eyebrow>Book a diagnostic</Eyebrow>
        <h1 className="d-mega" style={{ marginTop: "var(--space-sm)", maxWidth: "15ch" }}>
          Reserve your service visit.
        </h1>
        <p className="lede" style={{ marginTop: "var(--space-md)", maxWidth: "58ch" }}>
          A flat ${SITE.diagnosticFee} diagnostic secures a factory trained technician at your door, and it’s
          credited in full toward your repair. No hourly meter, no surprises.
        </p>
      </Reveal>
    </section>
  );
}

export default function BookPage() {
  return (
    <Shell active="book">
      <BookHeader />
      <BookForm />
    </Shell>
  );
}
