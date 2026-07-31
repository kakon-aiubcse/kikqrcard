"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Globe,
  Download,
} from "lucide-react";
import { Seo } from "@/components/seo";
import { Button, buttonVariants } from "@/components/ui/button";
import { buildVCard } from "@/components/business-card";
import { Logo } from "@/components/logo";
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
  link.click();
  URL.revokeObjectURL(url);
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

  const qrConfig = card.qrConfig || { type: "vcard", value: "" };
  const faceClass = cn(
    "relative flex aspect-[1.586/1] w-full flex-col overflow-hidden rounded-[6%] p-[6%] text-white shadow-lg",
    "bg-black",
    card.bgGrad,
    card.bgStyle,
  );

  const linkClass = (extra) =>
    cn(buttonVariants({ size: "lg" }), "w-full gap-2", extra);

  const renderAction = () => {
    switch (qrConfig.type) {
      case "whatsapp":
        return (
          <a
            href={`https://wa.me/${qrConfig.value}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass("bg-green-600 text-white hover:bg-green-700")}
          >
            <MessageCircle className="size-5" />
            Chat on WhatsApp
          </a>
        );
      case "phone":
        return (
          <a href={`tel:${qrConfig.value}`} className={linkClass()}>
            <Phone className="size-5" />
            Call {qrConfig.value}
          </a>
        );
      case "email":
        return (
          <a href={`mailto:${qrConfig.value}`} className={linkClass()}>
            <Mail className="size-5" />
            Email {qrConfig.value}
          </a>
        );
      case "link":
        return (
          <a
            href={qrConfig.value}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass()}
          >
            <Globe className="size-5" />
            Visit Link
          </a>
        );
      case "address":
        return (
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(qrConfig.value)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass()}
          >
            <MapPin className="size-5" />
            Open in Maps
          </a>
        );
      case "vcard":
      default:
        return (
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => downloadVCardFile(card)}
          >
            <Download className="size-5" />
            Save Contact
          </Button>
        );
    }
  };

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
        {renderAction()}
      </div>
    </div>
  );
}
