//header

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  return (
    <>
      {" "}
      <div className="flex flex-col h-screen bg-slate-100 xs:w-screen xs:flex xs:flex-row xs:items-start xs:justify-around xs:h-auto">
        {/* logo */}

        <div className="h-[20%] items-center justify-center top-5 relative xs:top-0 ">
          <div
            className=" items-center "
            onClick={() => {
              router.push("/");
            }}
          >
            <svg
              width="170"
              height="60"
              viewBox="0 0 200 60"
              fill="none"
              font-style="italic"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="60" rx="12" ry="12" fill="#DF3C5F" />

              <text
                x="25"
                y="45"
                font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                font-size="36"
                font-weight="700"
                fill="white"
              >
                KIK
              </text>

              <circle cx="140" cy="20" r="5" fill="teal" />
              <rect x="160" y="15" width="10" height="10" fill="blue" />
              <rect x="160" y="35" width="5" height="5" fill="black" />
              <circle cx="185" cy="40" r="3" fill="red" />

              <text
                x="90"
                y="45"
                font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                font-size="24"
                fill="white"
                font-weight="600"
              >
                QRcards
              </text>
            </svg>
          </div>
        </div>
        <Menu
          className="hidden xs:flex xs:relative w-16 h-16"
          onClick={() => {
            setMenu(!menu);
          }}
        />
        {/* nav */}

        <div
          className={`  flex flex-col h-full ${
            menu
              ? "hidden xs:flex xs:absolute bg-slate-100 xs:top-20 xs:w-screen xs:h-full xs:items-center xs:justify-start xs:z-50"
              : "flex xs:hidden"
          }`}
        >
          <nav className="h-[60%] items-start">
            <ul className="h-full flex flex-col  items-start justify-evenly relative ml-10 text-sky-900 font-semibold text-[20px]">
              <li className="text-start font-ios flex items-center gap-4">
                Home{" "}
              </li>
              <li className="text-start font-ios flex items-center gap-4">
                Cards{" "}
              </li>
              <li className="text-start font-ios flex items-center gap-4">
                {" "}
                Features
              </li>
              <li className="text-start font-ios flex items-center gap-4">
                About us
              </li>
            </ul>
          </nav>
          {/* profile */}
          <div
            className={`h-[20%] flex items-center justify-center font-ios  text-sky-900 ${
              menu
                ? "hidden xs:flex xs:relative bg-slate-100 xs:top-[00px] xs:left-[20px] xs:z-50"
                : "flex xs:hidden"
            }`}
          >
            <div className="font-bold text-[25px] flex justify-end gap-4">
              Profile
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Header;
