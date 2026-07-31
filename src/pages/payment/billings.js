import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Receipt,
  CheckCircle2,
  XCircle,
  Loader2,
  Check,
  Sparkles,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Seo } from "@/components/seo";
import DashboardShell from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const PLAN_DISPLAY = {
  personal: {
    id: "personal",
    name: "Personal",
    icon: Sparkles,
    price: "৳350",
    cycle: "/month",
    tagline: "For individuals building their network.",
    features: [
      "5 physical card orders / month",
      "Up to 5 virtual cards",
      "QR contact sharing",
      "Standard support",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    icon: Building2,
    price: "৳1,200",
    cycle: "/year",
    tagline: "For teams issuing cards at scale.",
    features: [
      "10–50 physical card orders / month",
      "Up to 100 virtual cards",
      "QR contact sharing",
      "Priority support",
    ],
    highlight: true,
  },
};

const STATUS_META = {
  completed: { variant: "default", icon: CheckCircle2 },
  initiated: { variant: "outline", icon: Loader2 },
  failed: { variant: "destructive", icon: XCircle },
  cancelled: { variant: "destructive", icon: XCircle },
};

const Billings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payingPlan, setPayingPlan] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const { plan, status: paymentStatus, trxID } = router.query;
  const preselectedPlan = PLAN_DISPLAY[plan] ? plan : null;
  const [selectedPlan, setSelectedPlan] = useState(preselectedPlan);

  useEffect(() => {
    if (preselectedPlan) setSelectedPlan(preselectedPlan);
  }, [preselectedPlan]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login");
    }
  }, [status]);

  const fetchHistory = useCallback(async (email) => {
    setLoadingHistory(true);
    try {
      const { data } = await axios.get("/api/payment/bkash/history", {
        params: { email },
      });
      setPayments(data.payments || []);
    } catch (err) {
      console.error("Error fetching payment history:", err.message);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;
    fetchHistory(email);
  }, [session, fetchHistory]);

  useEffect(() => {
    if (!paymentStatus) return;
    if (paymentStatus === "success") {
      toast.success(trxID ? `Payment successful. Transaction ID: ${trxID}` : "Payment successful.");
    } else if (paymentStatus === "cancelled") {
      toast.info("Payment was cancelled.");
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      toast.error("Payment failed. Please try again.");
    }
    const email = session?.user?.email;
    if (email) fetchHistory(email);
  }, [paymentStatus, trxID]);

  const handlePay = async () => {
    if (!selectedPlan) return;
    setLoading(true);
    setPayingPlan(selectedPlan);
    try {
      const res = await fetch("/api/payment/bkash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan }),
      });
      const data = await res.json();

      if (!res.ok || !data.bkashURL) {
        toast.error(data.error || "Failed to start bKash payment.");
        setLoading(false);
        setPayingPlan(null);
        return;
      }

      window.location.href = data.bkashURL;
    } catch (err) {
      toast.error("Failed to start bKash payment.");
      setLoading(false);
      setPayingPlan(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  const activePlan = selectedPlan ? PLAN_DISPLAY[selectedPlan] : null;

  return (
    <div className="md:pl-64">
      <Seo title="Billing" path="/payment/billings" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Plans &amp; Billing
            </h1>
            <p className="mt-1 text-muted-foreground">
              Choose a plan to unlock more virtual cards and physical card orders.
            </p>
          </div>

          {paymentStatus === "success" && (
            <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="size-5 shrink-0" />
              <span>
                Payment successful{trxID ? ` — Transaction ID: ${trxID}` : ""}. Your plan is now active.
              </span>
            </div>
          )}
          {(paymentStatus === "failed" || paymentStatus === "error") && (
            <div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <XCircle className="size-5 shrink-0" />
              <span>Payment failed. Please try again.</span>
            </div>
          )}
          {paymentStatus === "cancelled" && (
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
              <XCircle className="size-5 shrink-0" />
              <span>Payment was cancelled.</span>
            </div>
          )}

          {/* plan picker */}
          <div className="grid gap-6 md:grid-cols-2">
            {Object.values(PLAN_DISPLAY).map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPlan === p.id;
              return (
                <Card
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPlan(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedPlan(p.id);
                  }}
                  className={cn(
                    "cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary/40",
                    isSelected && "ring-primary",
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex size-9 items-center justify-center rounded-lg",
                            p.highlight
                              ? "bg-primary/15 text-primary"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon className="size-4" />
                        </div>
                        <CardTitle className="text-lg">{p.name}</CardTitle>
                      </div>
                      {p.highlight && <Badge>Most popular</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{p.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">{p.price}</span>
                      <span className="text-sm text-muted-foreground">BDT{p.cycle}</span>
                    </div>
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full border",
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        )}
                      >
                        {isSelected && <Check className="size-3" />}
                      </span>
                      {isSelected ? "Selected" : "Select this plan"}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* sticky checkout bar */}
          {activePlan && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Checking out</p>
                  <p className="text-lg font-semibold text-foreground">
                    {activePlan.name} Plan — {activePlan.price}
                    <span className="text-sm font-normal text-muted-foreground"> BDT{activePlan.cycle}</span>
                  </p>
                </div>
                <Button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-[#e2136e] text-white hover:bg-[#c10f5e] sm:w-fit"
                >
                  {loading && payingPlan === activePlan.id ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Redirecting to bKash...
                    </>
                  ) : (
                    "Pay with bKash"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* transaction history */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingHistory ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground">
                  <Loader2 className="size-5 animate-spin" />
                  Loading payment history...
                </div>
              ) : payments.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <Receipt className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All your payment details will display here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((p) => {
                        const meta = STATUS_META[p.status] || { variant: "outline", icon: Receipt };
                        const StatusIcon = meta.icon;
                        return (
                          <TableRow key={p.paymentID}>
                            <TableCell className="font-mono text-xs">
                              {p.invoiceNumber}
                            </TableCell>
                            <TableCell>{p.planName}</TableCell>
                            <TableCell>
                              {p.amount} {p.currency}
                            </TableCell>
                            <TableCell>
                              <Badge variant={meta.variant} className="gap-1">
                                <StatusIcon
                                  className={cn("size-3", p.status === "initiated" && "animate-spin")}
                                />
                                {p.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {p.createdAt
                                ? new Date(p.createdAt).toLocaleDateString()
                                : "-"}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billings;
