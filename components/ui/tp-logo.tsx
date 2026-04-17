interface TPLogoProps {
  size?: number;
  className?: string;
  shadow?: boolean;
}

/**
 * TechProwexa logo mark — amber rounded square with bold TP letterforms
 * and a graduation cap sitting on top, matching the brand identity.
 *
 * The component is ~18 % taller than wide to accommodate the cap.
 * All shapes are contained in a single scalable SVG.
 */
export default function TPLogo({ size = 32, className = "", shadow = true }: TPLogoProps) {
  // Total height is 18 % taller than width to include the graduation cap
  const h = Math.round(size * 1.18);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: h,
        flexShrink: 0,
        display: "inline-flex",
        filter: shadow
          ? "drop-shadow(0 4px 8px rgba(180,83,9,0.45)) drop-shadow(0 1px 2px rgba(0,0,0,0.18))"
          : undefined,
      }}
    >
      <svg width={size} height={h} viewBox="0 0 100 118" fill="none">
        <defs>
          {/* Main badge gradient — amber to dark orange */}
          <linearGradient
            id="tplogo-bg"
            x1="3" y1="28" x2="97" y2="115"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%"   stopColor="#fbbf24" />
            <stop offset="40%"  stopColor="#f59e0b" />
            <stop offset="75%"  stopColor="#d97706" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>

          {/* Radial top-left highlight on badge */}
          <radialGradient id="tplogo-hl" cx="38%" cy="28%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* ─────────────────────────────────────────────
            MAIN ROUNDED BADGE
        ───────────────────────────────────────────── */}
        <rect x="3" y="28" width="94" height="87" rx="20" fill="url(#tplogo-bg)" />
        {/* Radial highlight overlay */}
        <rect x="3" y="28" width="94" height="87" rx="20" fill="url(#tplogo-hl)" />

        {/* ─────────────────────────────────────────────
            GRADUATION CAP — sits on top, overlaps badge
        ───────────────────────────────────────────── */}

        {/* Cylindrical cap body — blends into top of badge */}
        <path
          d="M 30 21 L 70 21 L 70 34 Q 70 41 50 41 Q 30 41 30 34 Z"
          fill="#d97706"
        />
        {/* Ellipse where board meets body — adds depth */}
        <ellipse cx="50" cy="21" rx="20" ry="5.5" fill="#e88515" />

        {/* Mortarboard (diamond board) */}
        <polygon points="50,3 88,19 50,29 12,19" fill="#f97316" />
        {/* Subtle highlight on the top face of the board */}
        <polygon points="50,3 88,19 62,14 26,14" fill="rgba(255,240,100,0.22)" />

        {/* Tassel — hangs from the right corner of the board */}
        <line
          x1="88" y1="19" x2="88" y2="36"
          stroke="#b45309" strokeWidth="3" strokeLinecap="round"
        />
        <rect x="84" y="35" width="9" height="11" rx="3.5" fill="#b45309" />

        {/* ─────────────────────────────────────────────
            TP LETTERFORMS — bold, white, centred in badge
            T: crossbar x13..51, stem x26..38, h 52→106
            P: stem x60..72, bowl r=13 → rightmost x=85
            Centre of span (13→85) = 49 ≈ 50 ✓
        ───────────────────────────────────────────── */}

        {/* T — crossbar */}
        <rect x="13" y="52" width="38" height="12" rx="6" fill="white" />
        {/* T — stem (centred on crossbar: crossbar cx=32, stem cx=32) */}
        <rect x="26" y="52" width="12" height="54" rx="6" fill="white" />

        {/* P — stem */}
        <rect x="60" y="52" width="12" height="54" rx="6" fill="white" />
        {/*
          P — bowl: D-shaped semicircle.
          Start (72, 52) → arc to (72, 78), chord=26, r=13 → perfect semicircle.
          Z closes with a straight line → filled D shape.
          Rightmost point = 72 + 13 = 85.
        */}
        <path d="M 72 52 A 13 13 0 0 1 72 78 Z" fill="white" />
      </svg>
    </div>
  );
}
