import { MascotHead } from "./Mascot";
import { BUSINESS } from "@/config/business";

/**
 * LOGO LOCKUP — coded, vector, transparent-background, theme-independent.
 * The wordmark is live text in the display face, not an image, so it stays
 * crisp at any size and remains selectable/accessible.
 *
 * PROVISIONAL: the name is read from config so it can be replaced wholesale
 * if trademark clearance requires a different mark.
 */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <MascotHead alt="" className="h-10 w-auto shrink-0" sizes="44px" />
      {!compact && (
        <span className="leading-none">
          <span className="u-h3 block text-[0.98rem] tracking-tight">
            {BUSINESS.BUSINESS_NAME}
          </span>
          <span className="u-label block text-[0.6rem] text-ochre-text">
            Junk Removal
          </span>
        </span>
      )}
    </span>
  );
}
