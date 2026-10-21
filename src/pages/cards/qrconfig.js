"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import axios from "axios";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  ExternalLink,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { PageHeader } from "@/components/dashboard-ui";
import { QR_LINK_ICONS } from "@/components/qr-link-icons";
import {
  MAX_QR_LINKS,
  QR_LINK_GROUPS,
  QR_LINK_TYPES,
  cleanQrLink,
  normalizeQrConfig,
  validateQrLink,
} from "@/lib/qrConfigTypes";
import { getPublicCardUrl, isLocalOrigin, usePublicOrigin } from "@/lib/publicUrl";
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

const INPUT_MODES = { phone: "tel", email: "email", url: "url" };

export default function QrConfigPage() {
  const router = useRouter();
  const { id: cardId } = router.query;
  const { data: session, status } = useSession();
  const origin = usePublicOrigin();

  const [card, setCard] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [links, setLinks] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const keyCounter = useRef(0);

  const newKey = () => {
    keyCounter.current += 1;
    return `link-${keyCounter.current}`;
  };

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
        setLinks(
          normalizeQrConfig(match.qrConfig).links.map((l) => ({
            ...l,
            _key: newKey(),
          })),
        );
        setLoadState("ready");
      })
      .catch(() => {
        if (!cancelled) setLoadState("notfound");
      });

    return () => {
      cancelled = true;
    };
  }, [cardId, session]);

  const publicCardUrl = getPublicCardUrl(origin, cardId);
  const atLimit = links.length >= MAX_QR_LINKS;

  const addLink = (type) => {
    if (atLimit) return;
    setLinks((prev) => [...prev, { type, label: "", value: "", _key: newKey() }]);
    setDirty(true);
  };

  const updateLink = (key, patch) => {
    setLinks((prev) => prev.map((l) => (l._key === key ? { ...l, ...patch } : l)));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setDirty(true);
  };

  const removeLink = (key) => {
    setLinks((prev) => prev.filter((l) => l._key !== key));
    setErrors((prev) => ({ ...prev, [key]: "" }));
    setDirty(true);
  };

  const moveLink = (index, dir) => {
    setLinks((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setDirty(true);
  };

  const handleSave = async () => {
    const nextErrors = {};
    links.forEach((l) => {
      const error = validateQrLink(l);
      if (error) nextErrors[l._key] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Fix the highlighted links before saving.");
      return;
    }

    setSaving(true);
    try {
      const cleaned = links.map(cleanQrLink);
      await axios.patch("/api/cards/qrConfig", { id: cardId, links: cleaned });
      // Show the cleaned values (e.g. https:// added) so the form matches what is stored.
      setLinks(cleaned.map((l) => ({ ...l, _key: newKey() })));
      toast.success("Links saved. Anyone who scans your QR sees them now.");
      setDirty(false);
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to save links.");
    } finally {
      setSaving(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(publicCardUrl)
      .then(() => toast.success("Link copied."))
      .catch(() => toast.error("Could not copy the link."));
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
      <DashboardLayout title="QR Links" path="/cards/qrconfig">
        <div className="flex min-h-[60vh] items-center justify-center text-center">
          <div className="space-y-4">
            <p className="text-lg font-semibold text-foreground">
              Card not found.
            </p>
            <Button variant="secondary" size="lg" onClick={() => router.push("/cards/mycards")}>
              Back to My Cards
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="QR Links" path="/cards/qrconfig" width="max-w-5xl">
      <div className="space-y-8">
        <PageHeader
          title="QR links"
          description={
            <>
              Add your social and other links. When someone scans{" "}
              <span className="font-medium text-foreground">{card?.name}</span>
              &apos;s QR, they see these on their phone.
            </>
          }
          backHref={`/cards/createcard?id=${cardId}`}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* left: links */}
          <div className="space-y-6">
            <UICard>
              <CardHeader>
                <CardTitle>1. Add links</CardTitle>
                <CardDescription>
                  Tap a button to add it. Up to {MAX_QR_LINKS} links; add the
                  same kind more than once if you need.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {QR_LINK_GROUPS.map((group) => (
                  <div key={group.key} className="space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(QR_LINK_TYPES)
                        .filter(([, def]) => def.group === group.key)
                        .map(([type, def]) => {
                          const Icon = QR_LINK_ICONS[type];
                          return (
                            <Button
                              key={type}
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={atLimit}
                              onClick={() => addLink(type)}
                            >
                              <Icon />
                              {def.label}
                            </Button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </UICard>

            <UICard>
              <CardHeader>
                <CardTitle>2. Your links ({links.length})</CardTitle>
                <CardDescription>
                  Shown on the scan page in this order. Your card&apos;s contact
                  details are always available through Save Contact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {links.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    No links yet. Pick one above to get started.
                  </p>
                )}

                {links.map((link, index) => {
                  const def = QR_LINK_TYPES[link.type];
                  const Icon = QR_LINK_ICONS[link.type];
                  const error = errors[link._key];
                  return (
                    <div
                      key={link._key}
                      className="space-y-2 rounded-xl border border-border p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Icon className="size-4" />
                        </span>
                        <Label
                          htmlFor={`${link._key}-value`}
                          className="flex-1 truncate text-sm font-medium"
                        >
                          {def.label}
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === 0}
                          onClick={() => moveLink(index, -1)}
                          aria-label="Move up"
                        >
                          <ArrowUp className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          disabled={index === links.length - 1}
                          onClick={() => moveLink(index, 1)}
                          aria-label="Move down"
                        >
                          <ArrowDown className="size-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => removeLink(link._key)}
                          aria-label={`Remove ${def.label}`}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>

                      {def.needsLabel && (
                        <Input
                          value={link.label}
                          onChange={(e) =>
                            updateLink(link._key, { label: e.target.value })
                          }
                          placeholder="Button name, e.g. Portfolio"
                          maxLength={30}
                          aria-label="Button name"
                          aria-invalid={!!error}
                        />
                      )}
                      <Input
                        id={`${link._key}-value`}
                        value={link.value}
                        onChange={(e) =>
                          updateLink(link._key, { value: e.target.value })
                        }
                        placeholder={def.placeholder}
                        inputMode={INPUT_MODES[def.input] || "text"}
                        autoComplete="off"
                        aria-invalid={!!error}
                      />
                      {error ? (
                        <p className="text-sm text-destructive">{error}</p>
                      ) : (
                        def.hint && (
                          <p className="text-xs text-muted-foreground">
                            {def.hint}
                          </p>
                        )
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </UICard>

            <div className="flex items-center gap-3">
              <Button onClick={handleSave} disabled={saving || !dirty} size="lg">
                {saving ? "Saving..." : "Save links"}
              </Button>
              {!dirty && links.length > 0 && (
                <span className="text-sm text-muted-foreground">Up to date</span>
              )}
            </div>
          </div>

          {/* right: live preview */}
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <UICard>
              <CardHeader>
                <CardTitle>Your QR</CardTitle>
                <CardDescription>
                  This is the same QR printed on your card. It never changes,
                  even when you edit your links.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-border">
                  <QRCode value={publicCardUrl || " "} size={200} />
                </div>

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
                      aria-label="Open scan page"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>

                {isLocalOrigin(origin) && (
                  <div className="flex w-full gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    <p>
                      This QR points to {origin}, which a phone cannot reach.
                      Open the dashboard through your computer&apos;s network
                      address, or deploy the site, before testing with a phone.
                    </p>
                  </div>
                )}
              </CardContent>
            </UICard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
