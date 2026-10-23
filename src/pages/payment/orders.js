import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { History, Loader2, Package, Truck, MapPin, Receipt as ReceiptIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { DashboardLayout } from "@/components/dashboard-shell";
import {
  Banner,
  EmptyState,
  Field,
  FullscreenStatus,
  HistoryList,
  HistoryRow,
  IconTile,
  ListSkeleton,
  PageHeader,
  Segmented,
  SectionHeading,
  Surface,
} from "@/components/dashboard-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CARD_PRICE = 400;
const VAT_RATE = 0.03;
const DELIVERY_INSIDE = 50;
const DELIVERY_OUTSIDE = 100;

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : "—";

const Order = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

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
        !list.some((o) => ["placed", "initiated", "completed"].includes(o.status)),
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

  const vat = Math.round(CARD_PRICE * VAT_RATE * 100) / 100;
  const deliveryCharge = insideDhaka ? DELIVERY_INSIDE : DELIVERY_OUTSIDE;
  const total = isFirstOrder ? 0 : CARD_PRICE + deliveryCharge + vat;
  const formComplete = !!(form.name && form.phone && form.address && form.city);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formComplete) {
      toast.error("Please fill in all delivery details.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/payment/orders/create", {
        ...form,
        insideDhaka,
      });

      toast.success(`Order placed! Invoice: ${data.invoiceNumber}`);
      setForm({ name: "", phone: "", address: "", city: "" });
      const email = session?.user?.email;
      if (email) fetchHistory(email);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <FullscreenStatus title="Loading…" />;
  }

  const submitLabel = loading ? (
    <>
      <Loader2 className="size-4 animate-spin" /> Placing order…
    </>
  ) : (
    "Place order"
  );

  const summaryRows = [
    { label: "Card price", value: isFirstOrder ? "Free" : `৳${CARD_PRICE}` },
    { label: "Delivery", value: isFirstOrder ? "Free" : `৳${deliveryCharge}` },
    { label: "VAT (3%)", value: isFirstOrder ? "Free" : `৳${vat}` },
  ];

  return (
    <DashboardLayout title="Orders" path="/payment/orders" width="max-w-5xl">
      <div className="space-y-8 sm:space-y-10">
        <PageHeader
          title="Order a physical card"
          description="A printed QR card, delivered to your door."
        />

        <div className="grid gap-6 lg:grid-cols-5">
          {/* delivery form */}
          <Surface className="p-5 sm:p-7 lg:col-span-3">
            <div className="mb-6 flex items-center gap-3">
              <IconTile icon={MapPin} tone="blue" />
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                Delivery details
              </h2>
            </div>

            {isFirstOrder && !loadingHistory && (
              <Banner tone="success" icon={Truck} className="mb-5">
                Your first card is free — no payment needed for this order.
              </Banner>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" htmlFor="name">
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Recipient name"
                  />
                </Field>
                <Field label="Phone" htmlFor="phone">
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01XXXXXXXXX"
                  />
                </Field>
              </div>
              <Field label="Address" htmlFor="address">
                <Input
                  id="address"
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House, road, area"
                />
              </Field>
              <Field label="City" htmlFor="city">
                <Input
                  id="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="City"
                />
              </Field>
              <Field label="Delivery location">
                <Segmented
                  label="Delivery location"
                  value={insideDhaka}
                  onChange={setInsideDhaka}
                  options={[
                    { value: true, label: `Inside Dhaka · ৳${DELIVERY_INSIDE}` },
                    { value: false, label: `Outside Dhaka · ৳${DELIVERY_OUTSIDE}` },
                  ]}
                />
              </Field>

              <Button type="submit" size="lg" disabled={loading} className="w-full lg:hidden">
                {submitLabel}
              </Button>
            </form>
          </Surface>

          {/* price summary */}
          <div className="lg:col-span-2 lg:sticky lg:top-10 lg:self-start">
            <Surface className="p-5 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <IconTile icon={ReceiptIcon} tone="muted" />
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                  Order summary
                </h2>
              </div>

              <dl className="space-y-3 text-sm">
                {summaryRows.map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <dt className="text-muted-foreground">{row.label}</dt>
                    <dd className="font-medium tabular-nums text-foreground">{row.value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline justify-between border-t border-black/[0.07] pt-4">
                  <dt className="text-base font-semibold text-foreground">Total</dt>
                  <dd className="text-2xl font-semibold tabular-nums tracking-[-0.025em] text-foreground">
                    ৳{total}
                  </dd>
                </div>
              </dl>

              <Button
                type="button"
                size="lg"
                disabled={loading || !formComplete}
                onClick={handleSubmit}
                className="mt-6 hidden w-full lg:flex"
              >
                {submitLabel}
              </Button>
              <p className="mt-3 hidden text-center text-xs text-muted-foreground lg:block">
                {formComplete
                  ? "No online payment. We will contact you to confirm your order."
                  : "Fill in delivery details to continue."}
              </p>
            </Surface>
          </div>
        </div>

        {/* history */}
        <section className="space-y-4">
          <SectionHeading title="Order history" />
          {loadingHistory ? (
            <Surface>
              <ListSkeleton />
            </Surface>
          ) : orders.length === 0 ? (
            <EmptyState
              icon={History}
              title="No orders yet"
              message="All your order history will display here."
            />
          ) : (
            <Surface className="overflow-hidden">
              <HistoryList>
                {orders.map((o) => (
                  <HistoryRow
                    key={o._id}
                    icon={Package}
                    title={`${o.address}, ${o.city}`}
                    subtitle={`${o.invoiceNumber} · ${formatDate(o.createdAt)}`}
                    amount={`${o.total} ${o.currency}`}
                    status={o.status}
                  />
                ))}
              </HistoryList>
            </Surface>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Order;
