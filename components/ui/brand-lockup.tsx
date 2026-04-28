import TPLogo from "@/components/ui/tp-logo";

interface BrandLockupProps {
  size?: number;
  theme?: "dark" | "light";
  compact?: boolean;
  showTagline?: boolean;
  className?: string;
}

export default function BrandLockup({
  size = 36,
  theme = "dark",
  compact = false,
  showTagline = false,
  className = "",
}: BrandLockupProps) {
  const dark = theme === "dark";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <TPLogo size={size} />
      <div className="leading-none">
        <div
          className={`font-bold tracking-tight ${compact ? "text-lg" : "text-xl sm:text-2xl"} ${
            dark ? "text-black" : "text-white"
          }`}
        >
          <span>Tech</span>
          <span className={dark ? "text-orange-600" : "text-orange-300"}>Prowexa</span>
        </div>
        {showTagline && (
          <div
            className={`mt-1 text-[10px] uppercase tracking-[0.28em] ${
              dark ? "text-slate-500" : "text-amber-100/80"
            }`}
          >
            Learn. Build. Advance.
          </div>
        )}
      </div>
    </div>
  );
}
