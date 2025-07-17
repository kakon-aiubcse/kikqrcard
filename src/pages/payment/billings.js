import React, { useEffect } from "react";
import Sidebar from "../dashboard/sidebar";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Billings = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/authentication/login"); // Or wherever your login page is
    }
  }, [status]);

  if (status === "loading") return <div className="text-brand">Loading...</div>;
  return (
    <>
      <Sidebar />
      <div className="ml-[16.666667%] xs:ml-0 xs:relative xs:top-[110px]">
        <div className="flex flex-col items-center justify-center p-2 m-2">
          <span className="flex items-center justify-center text-brand font-cp text-3xl">
            Payment History
          </span>
          <div>
            <span>All your payment details will display here:</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billings;
