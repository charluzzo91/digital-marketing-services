/**
 * MASCOT — original coded artwork. PLACEHOLDER PENDING CHARACTER LOCK.
 *
 * This is built to the silhouette spec in brand/DESIGN-DIRECTION.md §7:
 * broad shoulders, compact build, oversized gloves, work boots, forest pants,
 * cream shirt, utility belt, green cap, confident half-smile.
 *
 * It is deliberately geometric and flat so it reads at 32px. Once the Higgsfield
 * character sheet is approved and vectorised, replace ONLY the paths in this file.
 * No other component imports mascot geometry.
 *
 * ORIGINAL WORK: designed from primitives. Not traced from, referencing, or
 * derived from any existing character or franchise.
 */

const INK = "#122A20";
const CREAM = "#F4EEDC";
const PAPER = "#FBF8F0";
const FOREST = "#214E3A";
const SAGE = "#9EAF91";
const OCHRE = "#C6923C";
const SW = 6;

/** Shared body group so every pose stays on-model. */
function Body({ armPose }: { armPose: "crossed" | "push" }) {
  return (
    <g stroke={INK} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
      {/* tail */}
      <path d="M112 300 C 74 316, 52 286, 68 258 C 76 244, 92 246, 96 260"
            fill="none" strokeWidth={SW - 1} />

      {/* back leg + boot */}
      <path d="M124 288 L152 288 L152 342 L124 342 Z" fill={FOREST} />
      <path d="M118 338 L154 338 L172 360 C177 365 174 373 166 373 L120 373 C113 373 111 368 111 362 Z" fill={INK} />

      {/* front leg + boot */}
      <path d="M164 292 L196 292 L196 348 L164 348 Z" fill={FOREST} />
      <path d="M158 344 L198 344 L217 366 C222 371 219 379 211 379 L160 379 C153 379 151 374 151 368 Z" fill={INK} />

      {/* torso — cream shirt, wide chest tapering to waist */}
      <path d="M118 300 C 112 258, 106 226, 110 204 C 115 182, 134 172, 158 172
               C 182 172, 202 182, 206 204 C 210 226, 204 258, 198 300 Z" fill={CREAM} />

      {/* hips / overalls */}
      <path d="M112 258 L204 258 L200 302 L116 302 Z" fill={FOREST} />
      {/* utility belt */}
      <path d="M110 250 L206 250 L206 268 L110 268 Z" fill={INK} />
      <rect x="148" y="252" width="22" height="14" rx="2" fill={OCHRE} stroke={INK} strokeWidth={4} />

      {armPose === "crossed" ? (
        <>
          {/* lower forearm */}
          <path d="M120 240 L196 232 L198 254 L122 262 Z" fill={CREAM} />
          {/* upper forearm */}
          <path d="M124 210 L200 204 L202 228 L126 234 Z" fill={CREAM} />
          {/* gloves — oversized */}
          <path d="M186 196 C204 194, 216 204, 215 218 C214 231, 202 238, 189 235 Z" fill={PAPER} />
          <path d="M128 234 C110 236, 100 248, 104 260 C108 272, 122 275, 132 268 Z" fill={PAPER} />
        </>
      ) : (
        <>
          {/* both arms forward, pushing */}
          <path d="M186 206 L246 214 L242 238 L184 230 Z" fill={CREAM} />
          <path d="M172 232 L240 240 L237 262 L170 254 Z" fill={CREAM} />
          <path d="M238 202 C258 202, 268 214, 265 228 C262 242, 246 246, 236 238 Z" fill={PAPER} />
        </>
      )}

      {/* ear (behind cap) */}
      <circle cx="128" cy="104" r="23" fill={CREAM} />
      <circle cx="128" cy="104" r="11" fill={SAGE} strokeWidth={4} />

      {/* head — snout to the right */}
      <path d="M126 118 C126 92, 146 74, 172 74 C200 74, 218 92, 219 116
               C220 133, 213 142, 224 148 C233 153, 231 163, 218 165
               L182 168 C152 170, 127 152, 126 128 Z" fill={CREAM} />

      {/* cap */}
      <path d="M128 96 C130 70, 150 56, 174 56 C200 56, 218 72, 219 96 Z" fill={FOREST} />
      <path d="M206 92 L252 98 C259 99, 259 108, 252 109 L205 108 Z" fill={FOREST} />

      {/* face */}
      <circle cx="225" cy="155" r="7" fill={INK} strokeWidth={0} />
      <circle cx="197" cy="120" r="7" fill={INK} strokeWidth={0} />
      <path d="M186 106 L204 110" strokeWidth={5} fill="none" />
      {/* half-smile */}
      <path d="M198 143 C 206 150, 214 150, 219 145" strokeWidth={5} fill="none" />
    </g>
  );
}

export function MascotStanding({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 400" className={className} role="img"
         aria-label="Illustration of the Tom and Gerry's workman mouse mascot, arms crossed">
      <Body armPose="crossed" />
    </svg>
  );
}

/** Mascot pushing the cart. Used by the intro overlay and the footer. */
export function MascotWithCart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 400" className={className} aria-hidden="true" focusable="false">
      <Body armPose="push" />
      <g stroke={INK} strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
        {/* cart body */}
        <path d="M270 236 L470 236 L452 340 L288 340 Z" fill={FOREST} />
        {/* dumpster stripe */}
        <path d="M276 272 L466 272 L462 292 L280 292 Z" fill={OCHRE} strokeWidth={0} />
        {/* junk silhouettes: lamp, box, chair leg, bag */}
        <path d="M312 236 L312 206 M300 206 L324 206 L318 188 L306 188 Z" fill={SAGE} strokeWidth={5} />
        <path d="M340 236 L340 200 L382 200 L382 236 Z" fill={PAPER} strokeWidth={5} />
        <path d="M360 200 L360 236 M340 214 L382 214" strokeWidth={4} fill="none" />
        <path d="M398 236 L404 196 L414 196 L412 236 Z" fill={SAGE} strokeWidth={5} />
        <path d="M424 236 C424 212, 440 204, 452 210 C462 215, 460 236, 458 236 Z" fill={PAPER} strokeWidth={5} />
        {/* wheels */}
        <circle cx="316" cy="356" r="24" fill={INK} />
        <circle cx="316" cy="356" r="8" fill={CREAM} strokeWidth={4} />
        <circle cx="428" cy="356" r="24" fill={INK} />
        <circle cx="428" cy="356" r="8" fill={CREAM} strokeWidth={4} />
      </g>
    </svg>
  );
}

/** Small head-only mark for favicon, social avatar and nav lockup. */
export function MascotHead({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      <g stroke={INK} strokeWidth={9} strokeLinejoin="round" strokeLinecap="round">
        <circle cx="62" cy="86" r="26" fill={CREAM} />
        <circle cx="62" cy="86" r="12" fill={SAGE} strokeWidth={6} />
        <path d="M60 100 C60 72, 82 52, 110 52 C140 52, 159 72, 160 98
                 C161 116, 153 126, 165 132 C175 138, 173 149, 159 151
                 L120 154 C88 156, 61 136, 60 112 Z" fill={CREAM} />
        <path d="M62 76 C64 48, 86 34, 112 34 C140 34, 159 51, 160 76 Z" fill={FOREST} />
        <path d="M146 72 L192 78 C199 79, 199 89, 192 90 L145 89 Z" fill={FOREST} />
        <circle cx="166" cy="141" r="8" fill={INK} strokeWidth={0} />
        <circle cx="136" cy="104" r="8" fill={INK} strokeWidth={0} />
        <path d="M124 88 L144 93" strokeWidth={7} fill="none" />
        <path d="M137 128 C146 136, 155 136, 160 130" strokeWidth={7} fill="none" />
      </g>
    </svg>
  );
}
