"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import axios from "axios";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  MapPin,
  Contact,
  Check,
  ExternalLink,
  Copy,
} from "lucide-react";
import { Seo } from "@/components/seo";
import DashboardShell from "@/components/dashboard-shell";
import { buildVCard } from "@/components/business-card";
import { QR_CONFIG_TYPES, validateQrConfigValue } from "@/lib/qrConfigTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  vcard: Contact,
  whatsapp: MessageCircle,
  link: Globe,
  phone: Phone,
  email: Mail,
  address: MapPin,
};

export default function QrConfigPage() {
  const router = useRouter();
  const { id: cardId } = router.query;
  const { data: session, status } = useSession();

  const [card, setCard] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [qrConfig, setQrConfig] = useState({ type: "vcard", value: "" });
  const [qrValueError, setQrValueError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login");
    }
  }, [status, router]);

  useEffect(() => {
    const email = session?.user?.email;
    if (!cardId || !email) return;

    let cancelled = false;
    axios
      .get(`/api/getCards/getsavedcard?email=${email}`)
      .then((res) => {
        if (cancelled) return;
        const match = (res.data?.savedCards || []).find(
          (c) => c._id === cardId,
        );
        if (!match) {
          setLoadState("notfound");
          return;
        }
        setCard(match);
        if (match.qrConfig?.type) {
          setQrConfig(match.qrConfig);
        }
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("notfound");
      });

    return () => {
      cancelled = true;
    };
  }, [cardId, session]);

  const publicCardUrl =
    typeof window !== "undefined" && cardId
      ? `${window.location.origin}/c/${cardId}`
      : "";

  const qrValue = qrConfig.type === "vcard" ? buildVCard(card || {}) : publicCardUrl;

  const selectType = useCallback((type) => {
    setQrConfig({ type, value: "" });
    setQrValueError("");
    setDirty(true);
  }, []);

  const handleSave = async () => {
    const valueError = validateQrConfigValue(qrConfig.type, qrConfig.value);
    setQrValueError(valueError);
    if (valueError) return;

    setSaving(true);
    try {
      await axios.patch("/api/cards/qrConfig", {
        id: cardId,
        email: session?.user?.email,
        qrType: qrConfig.type,
        qrValue: qrConfig.value,
      });
      toast.success("QR config saved. Your card's QR now reflects this.");
      setDirty(false);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to save QR config.");
    } finally {
      setSaving(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicCardUrl);
    toast.success("Link copied.");
  };

  if (status === "loading" || loadState === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (loadState === "notfound") {
    return (
      <div className="md:pl-64">
        <DashboardShell />
        <main className="flex h-screen items-center justify-center px-4 text-center">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-foreground">
              Card not found.
            </p>
            <Button variant="outline" onClick={() => router.push("/cards/mycards")}>
              Back to My Cards
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="md:pl-64">
      <Seo title="QR Config" path="/cards/qrconfig" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/cards/createcard?id=${cardId}`)}
              aria-label="Back to card"
            >
              <ArrowLeft className="size-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                QR Code Config
              </h1>
              <p className="text-sm text-muted-foreground">
                Decide what happens when someone scans{" "}
                <span className="font-medium text-foreground">{card?.name}</span>
                &apos;s card.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            {/* left: config */}
            <div className="space-y-6">
              <UICard>
                <CardHeader>
                  <CardTitle>1. What should scanning do?</CardTitle>
                  <CardDescription>
                    Pick one action. You can change it anytime without reprinting
                    the QR code.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {Object.entries(QR_CONFIG_TYPES).map(([key, def]) => {
                      const Icon = TYPE_ICONS[key];
                      const active = qrConfig.type === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => selectType(key)}
                          className={cn(
                            "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-colors",
                            active
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40 hover:bg-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-10 items-center justify-center rounded-full",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {active ? (
                              <Check className="size-5" />
                            ) : (
                              <Icon className="size-5" />
                            )}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {def.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </UICard>

              {qrConfig.type !== "vcard" && (
                <UICard>
                  <CardHeader>
                    <CardTitle>2. {QR_CONFIG_TYPES[qrConfig.type]?.label} details</CardTitle>
                    <CardDescription>
                      {QR_CONFIG_TYPES[qrConfig.type]?.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1.5">
                    <Label htmlFor="qr-value">
                      {QR_CONFIG_TYPES[qrConfig.type]?.label}
                    </Label>
                    <Input
                      id="qr-value"
                      value={qrConfig.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQrConfig({ ...qrConfig, value: val });
                        setQrValueError("");
                        setDirty(true);
                      }}
                      placeholder={QR_CONFIG_TYPES[qrConfig.type]?.valuePlaceholder}
                      aria-invalid={!!qrValueError}
                      autoFocus
                    />
                    {qrValueError && (
                      <p className="text-sm text-destructive">{qrValueError}</p>
                    )}
                  </CardContent>
                </UICard>
              )}

              <div className="flex items-center gap-3">
                <Button onClick={handleSave} disabled={saving || !dirty} size="lg">
                  {saving ? "Saving..." : "Save QR Config"}
                </Button>
                {!dirty && qrConfig.value !== "" && (
                  <span className="text-sm text-muted-foreground">
                    Up to date
                  </span>
                )}
              </div>
            </div>

            {/* right: live preview */}
            <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
              <UICard>
                <CardHeader>
                  <CardTitle>Live QR Preview</CardTitle>
                  <CardDescription>
                    This is the same QR shown on the card. It stays valid even
                    after you change the config.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border">
                    <QRCode value={qrValue || " "} size={200} />
                  </div>

                  {qrConfig.type !== "vcard" && (
                    <div className="w-full space-y-1.5 rounded-lg bg-muted p-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        Scan destination
                      </p>
                      <div className="flex items-center gap-2">
                        <a
                          href={publicCardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 truncate text-sm text-primary hover:underline"
                        >
                          {publicCardUrl}
                        </a>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          onClick={copyLink}
                          aria-label="Copy link"
                        >
                          <Copy className="size-3.5" />
                        </Button>
                        <a
                          href={publicCardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </UICard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
