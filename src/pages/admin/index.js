import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Users, CreditCard, Receipt, Wallet, Loader2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import axios from "axios";
import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRequireAdmin } from "@/lib/useRequireAdmin";

const STAT_CARDS = [
  {
    key: "userCount",
    label: "Users",
    icon: Users,
    format: (v) => v,
    href: "/admin/users",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    key: "cardCount",
    label: "Cards",
    icon: CreditCard,
    format: (v) => v,
    href: "/admin/cards",
    accent: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    key: "paymentCount",
    label: "Payments",
    icon: Receipt,
    format: (v) => v,
    href: "/admin/payments",
    accent: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    key: "revenue",
    label: "Revenue (completed)",
    icon: Wallet,
    format: (v) => `৳${Number(v).toLocaleString()}`,
    href: "/admin/payments",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

function AdminOverview() {
  const { ready } = useRequireAdmin();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      try {
        const { data } = await axios.get("/api/admin/stats");
        setStats(data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [ready]);

  if (!ready) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  const completionPct =
    stats && stats.paymentCount
      ? Math.round((stats.completedPaymentCount / stats.paymentCount) * 100)
      : 0;

  return (
    <div className="md:pl-64">
      <AdminShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Snapshot of users, cards, and payments across the platform.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon: Icon, format, href, accent }) => (
            <Card
              key={key}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => router.push(href)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <div className={`flex size-9 items-center justify-center rounded-full ${accent}`}>
                  <Icon className="size-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                  {loading ? (
                    <Loader2 className="size-5 animate-spin" />
                  ) : (
                    format(stats?.[key] ?? 0)
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                Payment completion
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {stats?.completedPaymentCount ?? 0} completed of {stats?.paymentCount ?? 0} total
                    </span>
                    <span className="font-medium text-foreground">{completionPct}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick links</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {STAT_CARDS.slice(0, 3).map(({ key, label, href }) => (
                <Button
                  key={key}
                  variant="outline"
                  className="justify-between"
                  onClick={() => router.push(href)}
                >
                  {label}
                  <ArrowUpRight className="size-4" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default AdminOverview;
