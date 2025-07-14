import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";
import Profile from "./profile";

const Index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-violet-600 font-semibold">Checking session...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null; // Prevent flicker before redirect
  }

  return (
    <div className="flex overflow-hidden flex-col sm:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col relative">
        <Profile />
      </div>
    </div>
  );
};

export default Index;
