import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import AdminShell from "@/components/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRequireAdmin } from "@/lib/useRequireAdmin";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "initiated", label: "Initiated" },
  { value: "failed", label: "Failed" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_VARIANT = {
  completed: "default",
  initiated: "outline",
  failed: "destructive",
  cancelled: "destructive",
};

function AdminPayments() {
  const { ready } = useRequireAdmin();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  const fetchPayments = useCallback(async (status = "all") => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/admin/payments", {
        params: status === "all" ? {} : { status },
      });
      setPayments(data.payments || []);
    } catch {
      toast.error("Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready) fetchPayments(tab);
  }, [ready, tab, fetchPayments]);

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
        <h1 className="text-2xl font-bold text-foreground">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {payments.length} payment{payments.length === 1 ? "" : "s"}
        </p>

        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList>
            {STATUS_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tab}>
            <div className="mt-4 rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Trx ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        <Loader2 className="mx-auto size-5 animate-spin" />
                      </TableCell>
                    </TableRow>
                  ) : payments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No payments found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    payments.map((p) => (
                      <TableRow key={p._id}>
                        <TableCell className="font-medium">{p.email}</TableCell>
                        <TableCell>{p.planName || p.planId || "—"}</TableCell>
                        <TableCell>৳{Number(p.amount).toLocaleString()}</TableCell>
                        <TableCell>{p.trxID || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={STATUS_VARIANT[p.status] || "outline"}>
                            {p.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default AdminPayments;
