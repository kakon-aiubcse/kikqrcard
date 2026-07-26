import QRCode from "react-qr-code";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export function buildVCard({ name, profession, phone, quote, email, website, address }) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name || ""}`,
    `TITLE:${profession || ""}`,
    phone ? `TEL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    website ? `URL:${website}` : "",
    address ? `ADR:;;${address};;;;` : "",
    quote ? `NOTE:${quote}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
}

export const CARD_PATTERNS = {
  none: {
    label: "Plain",
    overlayClass: "",
    overlayStyle: undefined,
  },
  dots: {
    label: "Dots",
    overlayClass: "opacity-20",
    overlayStyle: {
      backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
      backgroundSize: "14px 14px",
      color: "#ffffff",
    },
  },
  grid: {
    label: "Grid",
    overlayClass: "opacity-[0.15]",
    overlayStyle: {
      backgroundImage:
        "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
      backgroundSize: "18px 18px",
      color: "#ffffff",
    },
  },
  diagonal: {
    label: "Diagonal",
    overlayClass: "opacity-[0.15]",
    overlayStyle: {
      backgroundImage:
        "repeating-linear-gradient(45deg, currentColor 0, currentColor 1.5px, transparent 1.5px, transparent 12px)",
      color: "#ffffff",
    },
  },
  waves: {
    label: "Waves",
    overlayClass: "opacity-20",
    overlayStyle: {
      backgroundImage:
        "radial-gradient(circle at 0 50%, transparent 24%, currentColor 25%, currentColor 26%, transparent 27%, transparent 74%, currentColor 75%, currentColor 76%, transparent 77%)",
      backgroundSize: "24px 24px",
      color: "#ffffff",
    },
  },
  rings: {
    label: "Rings",
    overlayClass: "opacity-20",
    overlayStyle: {
      backgroundImage: "radial-gradient(circle, transparent 45%, currentColor 46%, currentColor 48%, transparent 49%)",
      backgroundSize: "26px 26px",
      color: "#ffffff",
    },
  },
};

export function BusinessCard({
  name,
  profession,
  phone,
  quote,
  email,
  website,
  address,
  bgGrad = "",
  bgStyle = "",
  pattern = "none",
}) {
  const vCard = buildVCard({ name, profession, phone, quote, email, website, address });
  const faceClass = cn(
    "group relative flex aspect-[1.586/1] w-full flex-col justify-between overflow-hidden rounded-[6%] p-[5%] text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.55)]",
    "bg-black",
    bgGrad,
    bgStyle,
  );
  const patternDef = CARD_PATTERNS[pattern] || CARD_PATTERNS.none;

  const PatternOverlay = patternDef.overlayStyle ? (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", patternDef.overlayClass)}
      style={patternDef.overlayStyle}
    />
  ) : null;

  const Sheen = (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/20 mix-blend-overlay"
    />
  );

  return (
    <div className="mx-auto flex w-full flex-row gap-4">
      {/* back: QR + quote */}
      <div className={faceClass}>
        {PatternOverlay}
        {Sheen}
        <div className="h-[16px] shrink-0">
          <div className="absolute left-2 top-2">
            <Logo size="xxs" variant="on-dark" />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center gap-4">
          <div className="shrink-0 rounded-md bg-white p-2 shadow-sm">
            <QRCode value={vCard} size={64} className="size-16" />
          </div>
          <p className="line-clamp-3 flex-1 text-center text-sm italic leading-snug text-white/80">
            {quote}
          </p>
        </div>
        <div className="pt-6">
          <p className="text-center text-[9px] font-light tracking-wide text-white/50">
            &copy; 2025, KIK QRcards. All rights reserved.
          </p>
        </div>
      </div>

      {/* front: name + profession + phone */}
      <div className={faceClass}>
        {PatternOverlay}
        {Sheen}
        <div className="h-[16px] shrink-0">
          <div className="absolute left-2 top-2">
            <Logo size="xxs" variant="on-dark" />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-xl font-bold italic tracking-wide text-white">{name}</p>
          <p className="mt-2 text-[10px] font-normal text-white/60">{profession}</p>
        </div>
        <div className="mt-12 flex items-center justify-center gap-x-4 text-gray-300/80">
          <Phone className="size-3 shrink-0" />
          <span className="font-mono text-sm font-normal tracking-[0.6em]">{phone}</span>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
