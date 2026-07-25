import React from "react";
import { ShoppingBag, History } from "lucide-react";
import DashboardShell from "@/components/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";

const Order = () => {
  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <div>
            <h1 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Active Orders
            </h1>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  All your active orders will display here.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Order History
            </h2>
            <Card>
              <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                  <History className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  All your order history will display here.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
