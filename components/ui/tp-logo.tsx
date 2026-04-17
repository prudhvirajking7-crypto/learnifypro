interface TPLogoProps {
  size?: number;
  className?: string;
  shadow?: boolean;
}

export default function TPLogo({ size = 32, className = "", shadow = true }: TPLogoProps) {
  const radius = Math.round(size * 0.26);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #d97706 65%, #c2410c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: shadow
          ? "0 4px 14px rgba(217,119,6,0.5), inset 0 1px 0 rgba(255,255,255,0.28)"
          : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top-left radial highlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.30) 0%, transparent 58%)",
          pointerEvents: "none",
        }}
      />

      {/* TP lettermark */}
      <svg
        width={Math.round(size * 0.64)}
        height={Math.round(size * 0.59)}
        viewBox="0 0 20 18"
        fill="none"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* T — crossbar */}
        <rect x="0.5" y="0" width="9" height="3" rx="1.5" fill="white" />
        {/* T — stem centred on crossbar */}
        <rect x="3.5" y="0" width="3" height="18" rx="1.5" fill="white" />

        {/* P — stem */}
        <rect x="11.5" y="0" width="3" height="18" rx="1.5" fill="white" />
        {/*
          P — bowl: semicircle D-shape.
          chord = 9, radius = 4.5 → perfect semicircle.
          Rightmost point = 14.5 + 4.5 = 19.
        */}
        <path d="M 14.5 0 A 4.5 4.5 0 0 1 14.5 9 Z" fill="white" />
      </svg>
    </div>
  );
}
