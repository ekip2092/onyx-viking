"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { SITE, APPLIANCES, TIME_WINDOWS } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon, ShieldIcon } from "@/components/ui/Icons";
import { Conversion } from "@/components/analytics/Conversion";

const selectStyle: CSSProperties = {
  height: "48px",
  padding: "0 14px",
  width: "100%",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-canvas)",
  color: "var(--color-ink)",
  border: "1px solid var(--color-hairline)",
  fontFamily: "var(--font-family)",
  fontSize: "14px",
  boxSizing: "border-box",
};

function FieldLabel({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow" style={{ display: "block", marginBottom: "6px" }}>
      {children}
    </label>
  );
}

const legendStyle: CSSProperties = {
  padding: 0,
  color: "var(--color-ink)",
  fontSize: "20px",
  fontWeight: 600,
  marginBottom: "var(--space-xs)",
};
const fieldsetStyle: CSSProperties = {
  border: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-md)",
};

const SUMMARY_BENEFITS = [
  "Credited in full toward your repair",
  "Factory trained technician to your door",
  "Genuine parts quote on the spot",
  "Fully insured · floors & cabinetry protected",
];

export function BookForm() {
  const [f, setF] = useState({
    appliance: APPLIANCES[0],
    issue: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    date: "",
    window: TIME_WINDOWS[1],
    card: "",
  });
  const [done, setDone] = useState(false);
  const set =
    (k: keyof typeof f) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value });

  // Booking reference, shown on the confirmation screen and passed to Stripe as
  // client_reference_id so the payment can be matched back to the appointment.
  const [ref, setRef] = useState(() => "CR-" + Math.floor(100000 + Math.random() * 899999));

  // When the customer returns from Stripe after paying (the Payment Link's
  // post-payment redirect should point at /book?status=paid), restore their
  // saved booking details and show the confirmation screen.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("status") === "paid" || params.get("paid") === "1") {
      try {
        const saved = JSON.parse(localStorage.getItem("onyx-booking") || "null");
        if (saved?.f) setF(saved.f);
        if (saved?.ref) setRef(saved.ref);
      } catch {
        /* ignore */
      }
      setDone(true);
      window.scrollTo(0, 0);
    }
  }, []);

  // Live availability for the selected date (2 jobs per 3-hour window).
  const [avail, setAvail] = useState<Record<string, { available: boolean; remaining: number }>>({});
  useEffect(() => {
    if (!f.date) {
      setAvail({});
      return;
    }
    let active = true;
    fetch(`/api/availability?date=${encodeURIComponent(f.date)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        const map: Record<string, { available: boolean; remaining: number }> = {};
        (d.windows ?? []).forEach((w: { label: string; available: boolean; remaining: number }) => {
          map[w.label] = { available: w.available, remaining: w.remaining };
        });
        setAvail(map);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [f.date]);

  // Persist the booking details (so they survive checkout and can be sent to
  // the calendar later) and send the customer to the embedded Stripe Checkout.
  const payAndBook = () => {
    try {
      localStorage.setItem("onyx-booking", JSON.stringify({ f, ref }));
    } catch {
      /* ignore */
    }
    window.location.href = "/checkout";
  };

  if (done) {
    return (
      <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
        {/* Booking confirmed (payment-link return). Fire the Ads conversion + GA4
            booking_complete once here, on the confirmation state only. */}
        <Conversion transactionId={ref} />
        <div className="wrap" style={{ maxWidth: "640px" }}>
          <div
            style={{
              border: "1px solid var(--color-hairline)",
              background: "var(--color-surface-card)",
              padding: "var(--space-xl)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-sm)",
            }}
          >
            <CheckIcon size={44} style={{ color: "var(--color-primary)" }} />
            <h2 className="d-lg" style={{ margin: 0 }}>
              Your visit is reserved.
            </h2>
            <p className="body" style={{ fontSize: "15px" }}>
              Thank you, {f.name || "there"}. Your ${SITE.diagnosticFee} diagnostic is confirmed for{" "}
              <strong style={{ color: "var(--color-ink)" }}>{f.date || "your selected date"}</strong>, {f.window}. A
              coordinator will call {f.phone || "you"} shortly to confirm the technician and arrival.
            </p>
            <div
              style={{
                display: "flex",
                gap: "var(--space-lg)",
                flexWrap: "wrap",
                marginTop: "var(--space-xs)",
                padding: "var(--space-md) 0",
                borderTop: "1px solid var(--color-hairline)",
                borderBottom: "1px solid var(--color-hairline)",
              }}
            >
              <div>
                <div className="eyebrow">Reference</div>
                <div style={{ color: "var(--color-ink)", fontSize: "18px", fontWeight: 600, marginTop: "4px" }}>{ref}</div>
              </div>
              <div>
                <div className="eyebrow">Appliance</div>
                <div style={{ color: "var(--color-ink)", fontSize: "18px", fontWeight: 600, marginTop: "4px" }}>{f.appliance}</div>
              </div>
              <div>
                <div className="eyebrow">Paid today</div>
                <div style={{ color: "var(--color-primary)", fontSize: "18px", fontWeight: 700, marginTop: "4px" }}>
                  ${SITE.diagnosticFee}.00
                </div>
              </div>
            </div>
            <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "13px" }}>
              The diagnostic fee is credited in full toward your repair. A receipt has been sent to{" "}
              {f.email || "your email"}.
            </p>
            <div style={{ marginTop: "var(--space-xs)" }}>
              <Button variant="primary" href={"tel:" + SITE.phoneTel}>
                Call if it’s urgent
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xl) var(--space-lg) var(--space-xxl)" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          payAndBook();
        }}
        className="book-grid wrap"
        style={{ display: "grid", gridTemplateColumns: "1.4fr 0.85fr", gap: "var(--space-xl)", alignItems: "start" }}
      >
        {/* form column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>1 · The appliance</legend>
            <div>
              <FieldLabel htmlFor="bf-appliance">Which appliance?</FieldLabel>
              <select id="bf-appliance" value={f.appliance} onChange={set("appliance")} style={selectStyle}>
                {APPLIANCES.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="bf-issue">What’s happening?</FieldLabel>
              <textarea
                id="bf-issue"
                value={f.issue}
                onChange={set("issue")}
                rows={3}
                placeholder="e.g. fridge side is warm, freezer frosting over…"
                style={{ ...selectStyle, height: "auto", padding: "12px 14px", lineHeight: 1.5, resize: "vertical" }}
              />
            </div>
          </fieldset>

          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>2 · Where &amp; when</legend>
            <Input label="Service address" value={f.address} onChange={set("address")} placeholder="123 Bellagio Rd" required />
            <div className="grid cols-2" style={{ gap: "var(--space-md)" }}>
              <Input label="City" value={f.city} onChange={set("city")} placeholder="Bel Air" required />
              <Input label="Preferred date" type="date" value={f.date} onChange={set("date")} required />
            </div>
            <div>
              <FieldLabel htmlFor="bf-window">Arrival window</FieldLabel>
              <select id="bf-window" value={f.window} onChange={set("window")} style={selectStyle}>
                {TIME_WINDOWS.map((o) => {
                  const a = avail[o];
                  const full = a ? !a.available : false;
                  return (
                    <option key={o} value={o} disabled={full}>
                      {o}
                      {full ? " (full)" : a ? ` (${a.remaining} left)` : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </fieldset>

          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>3 · Your details</legend>
            <div className="grid cols-2" style={{ gap: "var(--space-md)" }}>
              <Input label="Full name" value={f.name} onChange={set("name")} placeholder="Jane Calloway" required />
              <Input label="Phone" type="tel" value={f.phone} onChange={set("phone")} placeholder="(310) 555-0142" required />
            </div>
            <Input label="Email" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" required />
          </fieldset>
        </div>

        {/* summary rail */}
        <aside
          className="book-rail"
          style={{
            position: "sticky",
            top: "88px",
            border: "1px solid var(--color-hairline)",
            background: "var(--color-surface-card)",
            padding: "var(--space-lg)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/appliances/viking_undercounter.jpg"
            alt=""
            loading="lazy"
            style={{
              display: "block",
              width: "calc(100% + 2 * var(--space-lg))",
              margin: "calc(-1 * var(--space-lg)) calc(-1 * var(--space-lg)) 0",
              aspectRatio: "16 / 9",
              objectFit: "cover",
            }}
          />
          <div>
            <Eyebrow>Service call · diagnostic</Eyebrow>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "6px" }}>
              <span style={{ color: "var(--color-ink)", fontSize: "52px", fontWeight: 700, letterSpacing: "-1.5px", lineHeight: 1 }}>
                ${SITE.diagnosticFee}
              </span>
              <span className="eyebrow">flat</span>
            </div>
          </div>
          <ul className="list-reset" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SUMMARY_BENEFITS.map((b, i) => (
              <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: "var(--color-body-strong)", fontSize: "14px" }}>
                <CheckIcon size={18} style={{ color: "var(--color-primary)", flexShrink: 0, marginTop: "1px" }} /> {b}
              </li>
            ))}
          </ul>
          <div style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: "var(--space-md)" }}>
            <FieldLabel htmlFor="bf-card">Card to secure the visit</FieldLabel>
            <input
              id="bf-card"
              value={f.card}
              onChange={set("card")}
              inputMode="numeric"
              placeholder="•••• •••• •••• ••••"
              style={{ ...selectStyle, letterSpacing: "1px" }}
            />
            <p style={{ margin: "8px 0 0", display: "flex", alignItems: "center", gap: "6px", color: "var(--color-muted)", fontSize: "12px" }}>
              <ShieldIcon size={14} /> Secured &amp; encrypted. Charged only on confirmation.
            </p>
          </div>
          <Button variant="primary" type="submit">
            Reserve your visit
          </Button>
          <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "12px", textAlign: "center" }}>
            Prefer to talk first? Call{" "}
            <a href={"tel:" + SITE.phoneTel} style={{ color: "var(--color-ink)" }}>
              {SITE.phoneDisplay}
            </a>
          </p>
        </aside>
      </form>
    </section>
  );
}
