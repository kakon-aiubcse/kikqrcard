import { cn } from "@/lib/utils";

const SIZES = {
  sm: { mark: 32, gap: 8, textSize: 20, subSize: 10 },
  lg: { mark: 52, gap: 12, textSize: 32, subSize: 15 },
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
      ? "text-white"
      : variant === "mono"
        ? "text-current"
        : "text-foreground";
  const subClass =
    variant === "on-dark"
      ? "text-white/70"
      : variant === "mono"
        ? "text-current/70"
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
          className={cn("font-sans font-extrabold italic tracking-tight", textClass)}
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
