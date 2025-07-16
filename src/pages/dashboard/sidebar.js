//user dashboard/profile
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Logoxl from "../components/logoxl";
const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [showmenu, setShowmenu] = useState(false);
  
const checkUrlExists = async (url, timeout = 3000) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(id);

    return response.ok;
  } catch {
    return false;
  }
};
const handleLogout = async () => {
  await signOut({ redirect: false });

  const url1 = "https://kikqrcard.netlify.app/authentication/login";
  const url2 = "http://localhost:7000/authentication/login";

  const exists = await checkUrlExists(url1);
  window.location.href = exists ? url1 : url2;
};
  return (
    <>
      <aside className="fixed left-0 top-0  w-2/12 h-screen bg-violet-100 p-4 z-10 xs:fixed tb:h-full lp:h-full xb:h-full xs:w-screen xs:h-[100px]">
        {!showmenu ? (
          <Menu
            className="hidden xs:bg-brand xs:rounded-2xl xs:text-slate-200 xs:p-2 cursor-pointer xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
            onClick={() => {
              setShowmenu(!showmenu);
            }}
          />
        ) : (
          <X
            className="hidden xs:text-red-600 xs:bg-brand xs:rounded-2xl  xs:p-2 cursor-pointer xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
            onClick={() => {
              setShowmenu(!showmenu);
            }}
          />
        )}
        <div className="flex flex-col items-center justify-between h-screen xs:h-auto ">
          <div
            className="p-2 m-2  items-center justify-start xs:p-1 xs:m-0 xs:relative xs:right-24 xs:bottom-[45px] "
            onClick={() => {
              router.push("/");
            }}
          >
          <Logoxl/>
          </div>
          <div
            className={`${
              showmenu
                ? "hidden xs:flex xs:z-50 xs:bg-violet-100 xs:w-screen xs:h-screen xs:relative xs:bottom-5"
                : "xs:hidden flex flex-col justify-center items-center relative bottom-48 "
            }`}
          >
            <ul className="p-3 m-3 font-ios font-medium space-y-8 text-sm text-sky-950 xs:relative xs:left-10 xs:top-5">
              <li
                onClick={() => {
                  router.push("/dashboard/");
                  setShowmenu(false);
                }}
                className={`${
                  path === "/dashboard"
                    ? "shadow-md rounded-sm text-base text-sky-400 "
                    : "hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 "
                }`}
              >
                Dashboard
              </li>
              <li
                onClick={() => {
                  router.push("/cards/mycards");
                }}
                className={`${
                  path === "/cards/mycards"
                    ? "shadow-md rounded-sm text-base text-sky-400 "
                    : "hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 "
                }`}
              >
                My Cards
              </li>
              <li
                onClick={() => {
                  router.push("/payment/orders");
                }}
                className={`${
                  path === "/payment/orders"
                    ? "shadow-md rounded-sm text-base text-sky-400 "
                    : "hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 "
                }`}
              >
                Orders
              </li>
              <li
                onClick={() => {
                  router.push("/payment/billings");
                }}
                className={`${
                  path === "/payment/billings"
                    ? "shadow-md rounded-sm text-base text-sky-400 "
                    : "hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 "
                }`}
              >
                Payment
              </li>
              <li
                onClick={() => {
                  router.push("/dashboard/editprofile");
                }}
                className={`${
                  path === "/dashboard/editprofile"
                    ? "shadow-md rounded-sm text-base text-sky-400 "
                    : "hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 "
                }`}
              >
                Edit Profile
              </li>
            </ul>
            <button
             onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 flex xs:h-[30px] xs:top-[350px] items-center justify-center relative mr-4 rounded-lg font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
