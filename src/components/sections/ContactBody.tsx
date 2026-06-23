"use client";

import { useState, type CSSProperties } from "react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneIcon, ClockIcon, ShieldIcon, CheckIcon } from "@/components/ui/Icons";
import { trackFormSubmit } from "@/lib/gtag";

const APPLIANCE_OPTIONS = [
  "Viking refrigerator",
  "Viking freezer",
  "Viking wine storage",
  "Viking range",
  "Viking cooktop",
  "Viking wall oven",
  "Other",
];

const fieldControl: CSSProperties = {
  padding: "12px 14px",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-canvas)",
  color: "var(--color-ink)",
  border: "1px solid var(--color-hairline)",
  fontFamily: "var(--font-family)",
  fontSize: "14px",
  lineHeight: 1.5,
};

export function ContactBody() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    appliance: "Viking refrigerator",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [k]: e.target.value });
      setSent(false);
    };

  const detail = [
    { Icon: PhoneIcon, label: "Phone", value: SITE.phoneDisplay, href: "tel:" + SITE.phoneTel },
    { Icon: ClockIcon, label: "Office hours", value: SITE.hours },
    { Icon: ShieldIcon, label: "Licensed & insured", value: "Bonded · Family owned · Factory trained" },
  ];

  return (
    <section style={{ background: "var(--color-canvas)", padding: "var(--space-xxl) var(--space-lg)" }}>
      <div
        className="contact-grid wrap"
        style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: "var(--space-xl)", alignItems: "start" }}
      >
        {/* left: details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {detail.map((d, i) => {
              const I = d.Icon;
              return (
                <div key={i} style={{ display: "flex", gap: "var(--space-sm)", alignItems: "flex-start" }}>
                  <I size={20} style={{ color: "var(--color-primary)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div className="eyebrow">{d.label}</div>
                    {d.href ? (
                      <a href={d.href} style={{ color: "var(--color-ink)", textDecoration: "none", fontSize: "18px", fontWeight: 600 }}>
                        {d.value}
                      </a>
                    ) : (
                      <div style={{ color: "var(--color-body-strong)", fontSize: "15px", marginTop: "2px" }}>{d.value}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: "1px solid var(--color-hairline)", paddingTop: "var(--space-md)" }}>
            <div className="eyebrow">Email</div>
            <a href={"mailto:" + SITE.email} style={{ color: "var(--color-ink)", textDecoration: "none", fontSize: "16px" }}>
              {SITE.email}
            </a>
          </div>
          <div style={{ background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", padding: "var(--space-md)" }}>
            <h3 style={{ margin: 0, color: "var(--color-ink)", fontSize: "16px", fontWeight: 600 }}>Prefer to book directly?</h3>
            <p className="body" style={{ margin: "8px 0 var(--space-sm)" }}>
              Reserve a diagnostic visit and choose your arrival window online.
            </p>
            <Button variant="outline" href={SITE.book}>
              Book an appointment
            </Button>
          </div>
        </div>

        {/* right: form */}
        <div style={{ background: "var(--color-surface-card)", border: "1px solid var(--color-hairline)", padding: "var(--space-lg)" }}>
          {sent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", minHeight: "300px", justifyContent: "center" }}>
              <CheckIcon size={40} style={{ color: "var(--color-primary)" }} />
              <h3 className="d-lg" style={{ margin: 0 }}>
                Message received.
              </h3>
              <p className="body">
                Thank you, {form.name || "there"}. An Onyx coordinator will call you back shortly, usually within the
                hour during office hours.
              </p>
              <div>
                <Button variant="primary" href={"tel:" + SITE.phoneTel}>
                  Or call now
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                trackFormSubmit();
                setSent(true);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
            >
              <h2 style={{ margin: 0, color: "var(--color-ink)", fontSize: "22px", fontWeight: 600 }}>Request a callback</h2>
              <div className="grid cols-2" style={{ gap: "var(--space-md)" }}>
                <Input label="Full name" value={form.name} onChange={set("name")} placeholder="Jane Calloway" required />
                <Input label="Phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="(310) 555-0142" required />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xxs)" }}>
                <label className="eyebrow" htmlFor="appliance">
                  Appliance
                </label>
                <select
                  id="appliance"
                  value={form.appliance}
                  onChange={set("appliance")}
                  style={{ ...fieldControl, height: "48px", padding: "0 14px" }}
                >
                  {APPLIANCE_OPTIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xxs)" }}>
                <label className="eyebrow" htmlFor="msg">
                  How can we help?
                </label>
                <textarea
                  id="msg"
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  placeholder="Briefly describe the issue…"
                  style={{ ...fieldControl, resize: "vertical" }}
                />
              </div>
              <Button variant="primary" type="submit">
                Request callback
              </Button>
              <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "12px" }}>
                By submitting you agree to be contacted about your service request. We never share your details.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
