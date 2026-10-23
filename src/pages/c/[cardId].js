"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ChevronRight, Download } from "lucide-react";
import { Seo } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { buildVCard } from "@/components/business-card";
import { Logo } from "@/components/logo";
import { QR_LINK_ICONS } from "@/components/qr-link-icons";
import {
  getLinkHref,
  getLinkSubtitle,
  getLinkTitle,
  normalizeQrConfig,
} from "@/lib/qrConfigTypes";
import { cn } from "@/lib/utils";

function downloadVCardFile(card) {
  const vcard = buildVCard({
    name: card.name,
    profession: card.profession,
    phone: card.phone,
    quote: card.quote,
    email: card.contactEmail,
    website: card.website,
    address: card.address,
  });
  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${card.name || "contact"}.vcf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function PublicCardLanding() {
  const router = useRouter();
  const { cardId } = router.query;
  const [card, setCard] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!cardId) return;
    let cancelled = false;

    axios
      .get(`/api/getCards/getcardbyid?id=${cardId}`)
      .then((res) => {
        if (cancelled) return;
        setCard(res.data.card);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("notfound");
      });

    return () => {
      cancelled = true;
    };
  }, [cardId]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading card...</p>
      </div>
    );
  }

  if (status === "notfound" || !card) {
    return (
      <div className="flex h-screen items-center justify-center px-4 text-center">
        <p className="text-lg font-semibold text-foreground">
          Card not found.
        </p>
      </div>
    );
  }

  const { links } = normalizeQrConfig(card.qrConfig);
  const faceClass = cn(
    "relative flex aspect-[1.586/1] w-full flex-col overflow-hidden rounded-[6%] p-[6%] text-white shadow-lg",
    "bg-black",
    card.bgGrad,
    card.bgStyle,
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Seo title={card.name} path={`/c/${cardId}`} noIndex />
      <div className="w-full max-w-sm space-y-6">
        <div className={faceClass}>
          <div className="absolute left-[6%] top-[6%]">
            <Logo size="xxs" variant="on-dark" />
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-2xl font-bold italic tracking-wide">{card.name}</p>
            <p className="mt-1 text-sm text-white/70">{card.profession}</p>
          </div>
          {card.quote && (
            <p className="text-center text-sm italic text-white/60">
              &ldquo;{card.quote}&rdquo;
            </p>
          )}
          <p className="pt-4 text-center text-[9px] font-light tracking-wide text-white/50">
            &copy; 2025, KIK QRcards. All rights reserved.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={() => downloadVCardFile(card)}
        >
          <Download className="size-5" />
          Save Contact
        </Button>

        {links.length > 0 && (
          <ul className="space-y-3">
            {links.map((link, i) => {
              const Icon = QR_LINK_ICONS[link.type];
              const isWeb = /^https?:/i.test(getLinkHref(link));
              return (
                <li key={`${link.type}-${i}`}>
                  <a
                    href={getLinkHref(link)}
                    {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-3 rounded-xl bg-card p-3 text-card-foreground shadow-sm ring-1 ring-border transition-colors hover:bg-accent"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {getLinkTitle(link)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {getLinkSubtitle(link)}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
