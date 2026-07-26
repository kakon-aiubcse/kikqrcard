import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Receipt, CheckCircle2, XCircle, Loader2 } from "lucide-react";
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

const PLAN_DISPLAY = {
  personal: {
    name: "Personal",
    price: "৳350",
    cycle: "/month",
    features: "5 card orders/month, up to 5 virtual cards",
  },
  business: {
    name: "Business",
    price: "৳1,200",
    cycle: "/year",
    features: "10-50 card orders/month, up to 100 virtual cards",
  },
};

const STATUS_VARIANT = {
  completed: "default",
  initiated: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

const Billings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const { plan, status: paymentStatus, trxID } = router.query;
  const selectedPlan = PLAN_DISPLAY[plan] ? plan : null;

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
        return;
      }

      window.location.href = data.bkashURL;
    } catch (err) {
      toast.error("Failed to start bKash payment.");
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="md:pl-64">
      <Seo title="Billing" path="/payment/billings" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {selectedPlan ? "Complete Your Purchase" : "Payment History"}
          </h1>

          {paymentStatus === "success" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
              <CheckCircle2 className="size-5 shrink-0" />
              <span>
                Payment successful{trxID ? ` — Transaction ID: ${trxID}` : ""}. Your plan is now active.
              </span>
            </div>
          )}
          {(paymentStatus === "failed" || paymentStatus === "error") && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              <XCircle className="size-5 shrink-0" />
              <span>Payment failed. Please try again.</span>
            </div>
          )}
          {paymentStatus === "cancelled" && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-muted p-4 text-sm text-muted-foreground">
              <XCircle className="size-5 shrink-0" />
              <span>Payment was cancelled.</span>
            </div>
          )}

          {selectedPlan && (
            <Card className="mb-8">
              <CardHeader>
                <h2 className="text-lg font-bold text-foreground">
                  {PLAN_DISPLAY[selectedPlan].name} Plan
                </h2>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {PLAN_DISPLAY[selectedPlan].price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    BDT{PLAN_DISPLAY[selectedPlan].cycle}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {PLAN_DISPLAY[selectedPlan].features}
                </p>
                <Button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-[#e2136e] text-white hover:bg-[#c10f5e] sm:w-fit"
                >
                  {loading ? (
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
                    {payments.map((p) => (
                      <TableRow key={p.paymentID}>
                        <TableCell className="font-mono text-xs">
                          {p.invoiceNumber}
                        </TableCell>
                        <TableCell>{p.planName}</TableCell>
                        <TableCell>
                          {p.amount} {p.currency}
                        </TableCell>
                        <TableCell>
                          <Badge variant={STATUS_VARIANT[p.status] || "outline"}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString()
                            : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billings;
