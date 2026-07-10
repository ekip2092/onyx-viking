import { SITE } from "@/lib/site";
import { PhoneIcon } from "@/components/ui/Icons";

/* Fixed bottom call bar, shown only <= 760px (CSS handles the breakpoint).
   A slim promise line sits above two equal cells: Call (red) -> tel,
   Book service (graphite) -> booking. */
export function StickyCallBar() {
  return (
    <div className="callbar">
      <div className="cb-promise">One quote. One price. Guaranteed.</div>
      <div className="cb-row">
        <a className="cb-call" href={"tel:" + SITE.phoneTel}>
          <PhoneIcon size={16} /> Call
        </a>
        <a className="cb-book" href={SITE.book}>
          Book service
        </a>
      </div>
    </div>
  );
}
