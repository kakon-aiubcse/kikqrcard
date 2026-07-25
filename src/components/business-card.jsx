import QRCode from "react-qr-code";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const urlToEncode = "KIK QR Card";

export function BusinessCard({ name, profession, phone, quote, bgGrad = "", bgStyle = "" }) {
  const faceClass = cn(
    "relative flex h-[190px] w-full flex-col justify-between overflow-hidden rounded-xl p-4 text-white shadow-md ring-1 ring-black/5 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl",
    "bg-black",
    bgGrad,
    bgStyle,
  );

  return (
    <div className="flex w-full max-w-[420px] flex-col gap-4 sm:flex-row">
      {/* back: QR + quote */}
      <div className={faceClass}>
        <div className="flex justify-end">
          <Logo size="sm" variant="on-dark" />
        </div>
        <div className="flex flex-1 items-center justify-between gap-3">
          <div className="rounded-md bg-white p-1.5 shadow-sm">
            {urlToEncode && <QRCode value={urlToEncode} size={56} />}
          </div>
          <p className="line-clamp-3 text-right text-sm italic text-white/80">{quote}</p>
        </div>
        <p className="text-[10px] font-light text-white/50">
          &copy; 2025, KIK QRcards. All rights reserved.
        </p>
      </div>

      {/* front: name + profession + phone */}
      <div className={faceClass}>
        <div className="flex justify-end">
          <Logo size="sm" variant="on-dark" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-xl font-bold italic text-white">{name}</p>
          <p className="text-sm font-medium text-white/70">{profession}</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-white/80">
          <Phone className="size-4" />
          <span className="text-sm font-semibold tracking-wide">{phone}</span>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
