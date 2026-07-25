import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";
import Profile from "./profile";

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
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Checking session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2 text-center">
        <p className="text-lg font-semibold text-foreground">
          You are not logged in.
        </p>
        <p className="text-sm text-muted-foreground">
          Redirecting to the login page...
        </p>
      </div>
    );
  }

  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <Profile />
      </main>
    </div>
  );
};

export default Index;
