//analytics and billing history
import React from "react";
import { Clock } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileHistory = () => {
  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Profile History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Clock className="size-6" />
              </div>
              <p className="font-medium text-foreground">Coming soon</p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Analytics and billing history will appear here once this feature is available.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProfileHistory;
