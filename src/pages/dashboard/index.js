import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Lock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { DashboardHome } from "@/components/dashboard-home";
import { FullscreenStatus } from "@/components/dashboard-ui";

const Index = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === "loading") {
    return <FullscreenStatus title="Checking session…" />;
  }

  if (status === "unauthenticated") {
    return (
      <FullscreenStatus
        icon={Lock}
        spin={false}
        title="You are not logged in"
        message="Redirecting to the login page…"
      />
    );
  }

  return (
    <DashboardLayout title="Dashboard" path="/dashboard">
      <DashboardHome />
    </DashboardLayout>
  );
};

export default Index;
