import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Package,
  Pencil,
  Plus,
  Sparkles,
  Star,
  WalletCards,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { CardCollection } from "@/components/card-collection";
import {
  IconTile,
  Meter,
  PageHeader,
  SectionHeading,
  Surface,
  getInitials,
  useDashboardUser,
} from "@/components/dashboard-ui";
import { FREE_TIER, PLANS } from "@/../lib/bkash/plans";
import { cn } from "@/lib/utils";

const STATS = [
  { key: "saved", label: "Created", icon: WalletCards, tone: "indigo", href: "/cards/mycards" },
  { key: "favourite", label: "Favourites", icon: Star, tone: "orange", href: "/cards/favourites" },
  { key: "loved", label: "Loved", icon: Heart, tone: "pink", href: "/cards/loved" },
  { key: "orders", label: "Orders this month", icon: Package, tone: "green", href: "/payment/orders" },
];

const getJson = (url) =>
  fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error(`Failed to fetch ${url}:`, err);
      return {};
    });

function greetingFor(date) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

function UsageBlock({ label, used, total, emptyText, loading }) {
  const hasLimit = total > 0;
  const pct = hasLimit ? Math.min(100, Math.round((used / total) * 100)) : 0;

  if (loading) {
    return (
      <div aria-hidden="true">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="mt-2 h-9 w-24 animate-pulse rounded-lg bg-muted" />
        <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 flex items-baseline gap-1.5">
        <span className="text-3xl font-semibold tabular-nums tracking-[-0.03em] text-foreground">
          {hasLimit ? used : "—"}
        </span>
        <span className="text-sm text-muted-foreground">
          {hasLimit ? `of ${total} used` : emptyText}
        </span>
      </p>
      <Meter value={pct} label={label} className="mt-3" />
      {hasLimit && (
        <p className="mt-2 text-xs text-muted-foreground">
          {Math.max(0, total - used)} remaining
        </p>
      )}
    </div>
  );
}

export function DashboardHome() {
  const { data: session } = useSession();
  const user = useDashboardUser();

  const [greeting, setGreeting] = useState("Welcome back");
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ saved: 0, favourite: 0, loved: 0, orders: 0 });
  const [highlightedCards, setHighlightedCards] = useState([]);

  // Greeting depends on the viewer's local clock, so it is set after mount to avoid a hydration mismatch.
  useEffect(() => setGreeting(greetingFor(new Date())), []);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email) return;
    let cancelled = false;

    const load = async () => {
      const q = encodeURIComponent(email);
      const [favourite, loved, saved, highlighted, orders] = await Promise.all([
        getJson(`/api/getCards/getfavouritecard?email=${q}`),
        getJson(`/api/getCards/getlovedcard?email=${q}`),
        getJson(`/api/getCards/getsavedcard?email=${q}`),
        getJson(`/api/getCards/gethighlightedcard?email=${q}`),
        getJson(`/api/payment/orders/history?email=${q}`),
      ]);
      if (cancelled) return;

      // monthly quota usage: placed + initiated + completed orders since the 1st
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      const ordersThisMonth = (orders.orders || []).filter(
        (order) =>
          ["placed", "initiated", "completed"].includes(order.status) &&
          new Date(order.createdAt) >= startOfMonth,
      ).length;

      setCounts({
        favourite: (favourite.favouriteCards || []).length,
        loved: (loved.lovedCards || []).length,
        saved: (saved.savedCards || []).length,
        orders: ordersThisMonth,
      });
      setHighlightedCards(highlighted.highlightedCards || []);
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [session]);

  const handleHighlightedDelete = async (id, cardName) => {
    try {
      const res = await fetch(`/api/deletecard/deletehighlightedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHighlightedCards((prev) => prev.filter((card) => card._id !== id));
        toast.success(`Card deleted successfully: ${cardName}`);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    }
  };

  const plan = PLANS[user?.plan] || null;
  const virtualCardLimit = plan ? plan.virtualCardLimit : FREE_TIER.virtualCardLimit;
  const cardOrderQuota = plan ? plan.cardOrderQuota : 0;
  const firstName = user?.name?.split(" ").filter(Boolean)[0];

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHeader
        title={firstName ? `${greeting}, ${firstName}` : greeting}
        description="Here's an overview of your cards and account."
        actions={
          <Link href="/cards/createcard" className={buttonVariants({ size: "lg" })}>
            <Plus className="size-4" />
            New card
          </Link>
        }
      />

      {!loading && counts.saved === 0 && (
        <Surface className="relative overflow-hidden bg-gradient-to-br from-ios-indigo via-ios-indigo to-ios-blue p-6 text-white sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
          />
          <div className="relative max-w-md">
            <p className="text-sm font-medium text-white/80">Get started</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.025em]">
              Create your first card
            </h2>
            <p className="mt-2 text-[0.9375rem] text-white/80">
              Pick a design, add your details and share it with a QR code in under a minute.
            </p>
            <Link
              href="/cards/createcard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-5 bg-white text-ios-indigo hover:bg-white/90",
              )}
            >
              Create a card
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Surface>
      )}

      {/* activity */}
      <section aria-label="Activity" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map(({ key, label, icon, tone, href }) => (
          <Link
            key={key}
            href={href}
            className="group rounded-[1.25rem] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Surface className="flex h-full flex-col gap-4 p-4 transition-all duration-300 ease-apple group-hover:-translate-y-0.5 group-hover:shadow-lift sm:p-5">
              <div className="flex items-center justify-between">
                <IconTile icon={icon} tone={tone} />
                <ArrowUpRight className="size-4 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground" />
              </div>
              <div>
                {loading ? (
                  <div className="h-8 w-10 animate-pulse rounded-lg bg-muted" />
                ) : (
                  <p className="text-3xl font-semibold tabular-nums tracking-[-0.03em] text-foreground">
                    {counts[key]}
                  </p>
                )}
                <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
              </div>
            </Surface>
          </Link>
        ))}
      </section>

      {/* plan + account */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        <Surface className="p-5 sm:p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <IconTile icon={Sparkles} tone="indigo" size="lg" />
              {user ? (
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {plan ? plan.name : FREE_TIER.name} plan
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {plan ? `Billed ${plan.billingCycle}` : "Upgrade for more cards and physical orders"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2" aria-hidden="true">
                  <div className="h-4 w-32 animate-pulse rounded-full bg-muted" />
                  <div className="h-3 w-44 animate-pulse rounded-full bg-muted" />
                </div>
              )}
            </div>
            <Link
              href="/payment/billings"
              className={cn(buttonVariants({ variant: plan ? "secondary" : "default", size: "sm" }), "px-4")}
            >
              {plan ? "Manage plan" : "Upgrade"}
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-7 grid gap-7 sm:grid-cols-2">
            <UsageBlock
              label="Virtual cards"
              used={counts.saved}
              total={virtualCardLimit}
              loading={loading || !user}
            />
            <UsageBlock
              label="Physical orders this month"
              used={counts.orders}
              total={cardOrderQuota}
              emptyText="Requires a plan"
              loading={loading || !user}
            />
          </div>
        </Surface>

        <Surface className="p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={user?.profileImageBase64 || undefined} alt={user?.name || ""} />
              <AvatarFallback className="bg-ios-indigo/15 text-lg font-semibold text-primary">
                {getInitials(user?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold tracking-[-0.015em] text-foreground">
                {user?.name || "Your account"}
              </p>
              <p className="truncate text-sm text-muted-foreground">{user?.email || "—"}</p>
            </div>
          </div>

          <dl className="mt-5 divide-y divide-black/[0.06] text-sm">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="font-medium text-foreground">{user?.phone || "—"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-muted-foreground">Plan</dt>
              <dd className="font-medium text-foreground">{plan ? plan.name : FREE_TIER.name}</dd>
            </div>
          </dl>

          <Link
            href="/dashboard/editprofile"
            className={cn(buttonVariants({ variant: "secondary" }), "mt-2 w-full")}
          >
            <Pencil className="size-4" />
            Edit profile
          </Link>
        </Surface>
      </div>

      {/* highlighted cards */}
      <section className="space-y-4">
        <SectionHeading
          title="Highlighted"
          description="Cards you pinned to your dashboard."
        />
        <CardCollection
          cards={highlightedCards}
          loading={loading}
          emptyIcon={Sparkles}
          emptyTitle="No highlighted cards"
          emptyMessage="Highlighted cards you add will appear here."
          onDelete={handleHighlightedDelete}
          editHref={() => "/dashboard/editprofile"}
        />
      </section>
    </div>
  );
}

export default DashboardHome;
