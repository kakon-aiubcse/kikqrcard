import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Receipt } from "lucide-react";
import DashboardShell from "@/components/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";

const Billings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login"); // Or wherever your login page is
    }
  }, [status]);

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
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Payment History
          </h1>
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Receipt className="size-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                All your payment details will display here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Billings;
