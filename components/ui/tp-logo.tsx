interface TPLogoProps {
  size?: number;
  className?: string;
  shadow?: boolean;
}

/**
 * TechProwexa logo mark — amber rounded square with bold TP letterforms
 * and a graduation cap sitting on top, matching the brand identity.
 */
export default function TPLogo({ size = 32, className = "", shadow = true }: TPLogoProps) {
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
          <radialGradient id="tplogo-hl" cx="38%" cy="28%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* ── Main rounded badge ── */}
        <rect x="3" y="28" width="94" height="87" rx="20" fill="url(#tplogo-bg)" />
        <rect x="3" y="28" width="94" height="87" rx="20" fill="url(#tplogo-hl)" />

        {/* ── Graduation cap body (cylinder) ── */}
        <path d="M 30 21 L 70 21 L 70 34 Q 70 41 50 41 Q 30 41 30 34 Z" fill="#d97706" />
        <ellipse cx="50" cy="21" rx="20" ry="5.5" fill="#e88515" />

        {/* ── Mortarboard (diamond board) ── */}
        <polygon points="50,3 88,19 50,29 12,19" fill="#f97316" />
        <polygon points="50,3 88,19 62,14 26,14" fill="rgba(255,240,100,0.22)" />

        {/* ── Tassel ── */}
        <line x1="88" y1="19" x2="88" y2="36" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        <rect x="84" y="35" width="9" height="11" rx="3.5" fill="#b45309" />

        {/* ── lowercase t ── */}
        {/* stem — full height */}
        <rect x="27" y="55" width="9" height="48" rx="4.5" fill="white" />
        {/* crossbar at x-height (not at top — key difference from uppercase T) */}
        <rect x="18" y="68" width="18" height="9" rx="4.5" fill="white" />

        {/* ── lowercase p ── */}
        {/* stem — full height */}
        <rect x="62" y="55" width="9" height="48" rx="4.5" fill="white" />
        {/* bowl at top: chord=22, r=11, semicircle, rightmost=82 */}
        <path d="M 71 55 A 11 11 0 0 1 71 77 Z" fill="white" />
      </svg>
    </div>
  );
}
