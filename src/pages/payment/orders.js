import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { History, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import DashboardShell from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const CARD_PRICE = 400;
const VAT_RATE = 0.03;
const DELIVERY_INSIDE = 50;
const DELIVERY_OUTSIDE = 100;

const STATUS_VARIANT = {
  completed: "default",
  initiated: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

const Order = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { status: paymentStatus, trxID } = router.query;

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "" });
  const [insideDhaka, setInsideDhaka] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [isFirstOrder, setIsFirstOrder] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login");
    }
  }, [status]);

  const fetchHistory = useCallback(async (email) => {
    setLoadingHistory(true);
    try {
      const { data } = await axios.get("/api/payment/orders/history", {
        params: { email },
      });
      const list = data.orders || [];
      setOrders(list);
      setIsFirstOrder(
        !list.some((o) => o.status === "initiated" || o.status === "completed"),
      );
    } catch (err) {
      console.error("Error fetching order history:", err.message);
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
      toast.success(trxID ? `Order paid. Transaction ID: ${trxID}` : "Order confirmed.");
    } else if (paymentStatus === "cancelled") {
      toast.info("Order payment was cancelled.");
    } else if (paymentStatus === "failed" || paymentStatus === "error") {
      toast.error("Order payment failed. Please try again.");
    }
    const email = session?.user?.email;
    if (email) fetchHistory(email);
  }, [paymentStatus, trxID]);

  const vat = Math.round(CARD_PRICE * VAT_RATE * 100) / 100;
  const deliveryCharge = insideDhaka ? DELIVERY_INSIDE : DELIVERY_OUTSIDE;
  const total = isFirstOrder ? 0 : CARD_PRICE + deliveryCharge + vat;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment/orders/create", {
        ...form,
        insideDhaka,
      });

      if (data.free) {
        toast.success("Your first card is free! Order confirmed.");
        setForm({ name: "", phone: "", address: "", city: "" });
        const email = session?.user?.email;
        if (email) fetchHistory(email);
      } else if (data.bkashURL) {
        window.location.href = data.bkashURL;
        return;
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to place order.");
    } finally {
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
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div>
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Order a Physical Card
            </h1>

            {paymentStatus === "success" && (
              <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 className="size-5 shrink-0" />
                <span>
                  Payment successful{trxID ? ` — Transaction ID: ${trxID}` : ""}. Your card is on its way.
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
                <span>Order payment was cancelled.</span>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Delivery details</CardTitle>
              </CardHeader>
              <CardContent>
                {isFirstOrder && !loadingHistory && (
                  <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
                    Your first card is free! No payment needed for this order.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Recipient name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="House, road, area"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Delivery location</Label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setInsideDhaka(true)}
                          className={cn(
                            "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors",
                            insideDhaka
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          Inside Dhaka (৳{DELIVERY_INSIDE})
                        </button>
                        <button
                          type="button"
                          onClick={() => setInsideDhaka(false)}
                          className={cn(
                            "flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors",
                            !insideDhaka
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          Outside Dhaka (৳{DELIVERY_OUTSIDE})
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-lg border border-border p-4">
                      <h3 className="mb-3 font-semibold text-foreground">Price breakdown</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Card price</span>
                          <span>{isFirstOrder ? "Free" : `৳${CARD_PRICE}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Delivery charge</span>
                          <span>{isFirstOrder ? "Free" : `৳${deliveryCharge}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">VAT (3%)</span>
                          <span>{isFirstOrder ? "Free" : `৳${vat}`}</span>
                        </div>
                        <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                          <span>Total</span>
                          <span>৳{total}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#e2136e] text-white hover:bg-[#c10f5e]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" /> Placing order...
                        </>
                      ) : isFirstOrder ? (
                        "Confirm free order"
                      ) : (
                        "Confirm & Pay with bKash"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Order History
            </h2>
            <Card>
              <CardContent>
                {loadingHistory ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" />
                    Loading order history...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                      <History className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All your order history will display here.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow key={o._id}>
                          <TableCell className="font-mono text-xs">
                            {o.invoiceNumber}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">
                            {o.address}, {o.city}
                          </TableCell>
                          <TableCell>
                            {o.total} {o.currency}
                          </TableCell>
                          <TableCell>
                            <Badge variant={STATUS_VARIANT[o.status] || "outline"}>
                              {o.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {o.createdAt
                              ? new Date(o.createdAt).toLocaleDateString()
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
        </div>
      </main>
    </div>
  );
};

export default Order;
