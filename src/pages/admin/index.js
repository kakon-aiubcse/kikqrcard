import { useEffect, useState } from "react";
import { Users, CreditCard, Receipt, Wallet, Loader2 } from "lucide-react";
import axios from "axios";
import AdminShell from "@/components/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRequireAdmin } from "@/lib/useRequireAdmin";

const STAT_CARDS = [
  { key: "userCount", label: "Users", icon: Users, format: (v) => v },
  { key: "cardCount", label: "Cards", icon: CreditCard, format: (v) => v },
  { key: "paymentCount", label: "Payments", icon: Receipt, format: (v) => v },
  {
    key: "revenue",
    label: "Revenue (completed)",
    icon: Wallet,
    format: (v) => `৳${Number(v).toLocaleString()}`,
  },
];

function AdminOverview() {
  const { ready } = useRequireAdmin();
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

  return (
    <div className="md:pl-64">
      <AdminShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Snapshot of users, cards, and payments across the platform.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon: Icon, format }) => (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
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
      </main>
    </div>
  );
}

export default AdminOverview;
