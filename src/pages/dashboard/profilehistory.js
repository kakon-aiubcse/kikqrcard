//analytics and billing history
import React from "react";
import { Clock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { EmptyState, PageHeader } from "@/components/dashboard-ui";

const ProfileHistory = () => {
  return (
    <DashboardLayout title="Profile History" path="/dashboard/profilehistory" width="max-w-3xl">
      <div className="space-y-8">
        <PageHeader title="Profile history" description="Activity and billing at a glance." />
        <EmptyState
          icon={Clock}
          title="Coming soon"
          message="Analytics and billing history will appear here once this feature is available."
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfileHistory;
