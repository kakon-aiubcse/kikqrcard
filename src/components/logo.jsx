import { cn } from "@/lib/utils";

const SIZES = {
  xxs: { mark: 16, gap: 3, textSize: 8, subSize: 4 },
  xs: { mark: 26, gap: 5, textSize: 13, subSize: 6 },
  sm: { mark: 40, gap: 8, textSize: 20, subSize: 8 },
  lg: { mark: 64, gap: 12, textSize: 32, subSize: 12 },
};

// QR finder-pattern glyph: three corner squares + center dot, echoes a scanned QR code.
function QrMark({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" className="fill-primary" />
      {/* top-left finder */}
      <rect x="6" y="6" width="11" height="11" rx="2.5" className="fill-primary-foreground" />
      <rect x="9.5" y="9.5" width="4" height="4" rx="1" className="fill-primary" />
      {/* top-right finder */}
      <rect x="23" y="6" width="11" height="11" rx="2.5" className="fill-primary-foreground" />
      <rect x="26.5" y="9.5" width="4" height="4" rx="1" className="fill-primary" />
      {/* bottom-left finder */}
      <rect x="6" y="23" width="11" height="11" rx="2.5" className="fill-primary-foreground" />
      <rect x="9.5" y="26.5" width="4" height="4" rx="1" className="fill-primary" />
      {/* bottom-right data dots */}
      <rect x="24.5" y="24.5" width="4" height="4" rx="1" className="fill-primary-foreground" />
      <rect x="30" y="24.5" width="3.5" height="3.5" rx="1" className="fill-primary-foreground/60" />
      <rect x="24.5" y="30" width="3.5" height="3.5" rx="1" className="fill-primary-foreground/60" />
    </svg>
  );
}

// variant "filled": purple QR mark + dark wordmark (default, for light surfaces)
// variant "on-dark": purple QR mark + white wordmark (for placement on dark/card surfaces)
// variant "mono": single-color mark + text, for tight/monochrome contexts
export function Logo({ size = "lg", variant = "filled", className }) {
  const { mark, gap, textSize, subSize } = SIZES[size] ?? SIZES.lg;

  const textClass =
    variant === "on-dark"
      ? "bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
      : variant === "mono"
        ? "text-current"
        : "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent";
  const subClass =
    variant === "on-dark"
      ? "text-gray-300/70"
      : variant === "mono"
        ? "text-current/60"
        : "text-muted-foreground";
  const markClass = variant === "mono" ? "[&_.fill-primary]:fill-current" : "";

  return (
    <div
      className={cn("flex shrink-0 items-center", className)}
      style={{ gap }}
      role="img"
      aria-label="KIK QRcard"
    >
      <QrMark size={mark} className={markClass} />
      <div className="flex flex-col justify-center leading-none">
        <span
          className={cn("font-sans font-extrabold italic tracking-wider", textClass)}
          style={{ fontSize: textSize, lineHeight: 1 }}
        >
          KIK
        </span>
        <span
          className={cn("font-sans font-semibold uppercase tracking-widest", subClass)}
          style={{ fontSize: subSize, lineHeight: 1.4 }}
        >
          QRcard
        </span>
      </div>
    </div>
  );
}

export default Logo;
