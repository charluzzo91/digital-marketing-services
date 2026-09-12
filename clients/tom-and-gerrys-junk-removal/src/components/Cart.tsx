/**
 * Junk cart — pure SVG. A simple geometric object, so vector is the right call here
 * (unlike the character). Holds four readable silhouettes: lamp, box, chair leg, bag.
 */
const LINE = "#2B3A30";
const FOREST = "#24483C";
const OCHRE = "#C6923C";
const SAGE = "#9CA284";
const CREAM = "#EAD8B4";
const BOOT = "#3A332B";

export function Cart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 190" className={className} aria-hidden="true" focusable="false">
      <g stroke={LINE} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
        {/* junk, drawn behind the body so it sits inside the cart */}
        <path d="M44 62 L44 30 M30 30 L58 30 L51 10 L37 10 Z" fill={SAGE} />
        <path d="M74 62 L74 22 L120 22 L120 62 Z" fill={CREAM} />
        <path d="M97 22 L97 62 M74 38 L120 38" strokeWidth="3.5" fill="none" />
        <path d="M136 62 L143 18 L154 18 L152 62 Z" fill={SAGE} />
        <path d="M166 62 C166 36, 184 27, 197 34 C208 40, 206 62, 204 62 Z" fill={CREAM} />
        {/* body */}
        <path d="M14 58 L226 58 L206 150 L34 150 Z" fill={FOREST} />
        {/* dumpster stripe */}
        <path d="M20 90 L220 90 L216 110 L24 110 Z" fill={OCHRE} strokeWidth="0" />
        {/* wheels */}
        <circle cx="62" cy="166" r="22" fill={BOOT} />
        <circle cx="62" cy="166" r="7" fill={CREAM} strokeWidth="3.5" />
        <circle cx="178" cy="166" r="22" fill={BOOT} />
        <circle cx="178" cy="166" r="7" fill={CREAM} strokeWidth="3.5" />
      </g>
    </svg>
  );
}
