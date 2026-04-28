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
          ? "drop-shadow(0 10px 18px rgba(234,88,12,0.28)) drop-shadow(0 2px 5px rgba(15,23,42,0.16))"
          : undefined,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 112 112" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="tplogo-surface" x1="22" y1="14" x2="90" y2="96" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF9A3D" />
            <stop offset="45%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#D95F08" />
          </linearGradient>
          <radialGradient id="tplogo-glow" cx="31%" cy="19%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="16" y="16" width="80" height="80" rx="22" fill="#9A3412" opacity="0.16" />
        <rect x="14" y="10" width="84" height="84" rx="22" fill="url(#tplogo-surface)" />
        <rect x="16" y="12" width="80" height="80" rx="20" fill="url(#tplogo-glow)" />
        <path d="M24 19C28 15.5 34 14 43 14H69C83 14 91 22 91 36V41C78 35 62 32 45 34C34 35.3 26 32.8 22 27.8C21.5 24.5 22.2 21.6 24 19Z" fill="#FFFFFF" opacity="0.08" />

        <text
          x="56"
          y="62"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontFamily="'Trebuchet MS', Arial, Helvetica, sans-serif"
          fontSize="38"
          fontWeight="900"
          letterSpacing="-3"
        >
          tp
        </text>
      </svg>
    </div>
  );
}
