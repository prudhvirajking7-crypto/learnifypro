interface TPLogoProps {
  size?: number;
  className?: string;
  shadow?: boolean;
}

/**
 * TechProwexa monogram mark.
 * Orange brand tile with compact white tp lettering for strong recognition
 * at navbar, auth, and dashboard sizes.
 */
export default function TPLogo({ size = 32, className = "", shadow = true }: TPLogoProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        display: "inline-flex",
        filter: shadow
          ? "drop-shadow(0 8px 16px rgba(217,119,6,0.32)) drop-shadow(0 2px 5px rgba(15,23,42,0.18))"
          : undefined,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 112 112" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tplogo-surface" x1="12" y1="10" x2="102" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="42%" stopColor="#F97316" />
            <stop offset="75%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          <linearGradient id="tplogo-stroke" x1="16" y1="16" x2="96" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
          <radialGradient id="tplogo-glow" cx="34%" cy="18%" r="72%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tplogo-core" x1="30" y1="28" x2="86" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>
        </defs>

        <rect x="8" y="8" width="96" height="96" rx="28" fill="#0F172A" opacity="0.08" />
        <rect x="8" y="6" width="96" height="96" rx="28" fill="url(#tplogo-surface)" />
        <rect x="8.75" y="6.75" width="94.5" height="94.5" rx="27.25" stroke="url(#tplogo-stroke)" strokeOpacity="0.45" strokeWidth="1.5" />
        <rect x="16" y="14" width="80" height="80" rx="22" fill="url(#tplogo-glow)" />

        <text
          x="56"
          y="68"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#tplogo-core)"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="46"
          fontWeight="900"
          letterSpacing="-4"
        >
          tp
        </text>
      </svg>
    </div>
  );
}
