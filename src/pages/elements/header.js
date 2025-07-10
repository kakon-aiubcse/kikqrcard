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
      <div className="flex flex-col h-screen bg-violet-100 xs:w-screen xs:flex xs:flex-row xs:items-start xs:justify-around xs:h-auto">
        {/* logo */}

        <div className="h-[20%] items-center justify-center top-5 relative xs:top-0 xs:py-1 ">
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
              fontStyle="italic"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="60" rx="12" ry="12" fill="#8F87F1" />

              <text
                x="20"
                y="45"
                fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                fontSize={36}
                fontWeight="700"
                fill="white"
              >
                KIK
              </text>

              <circle cx="140" cy="20" r="5" fill="teal" />
              <rect x="160" y="15" width="10" height="10" fill="blue" />
              <rect x="160" y="35" width="5" height="5" fill="black" />
              <circle cx="185" cy="40" r="3" fill="red" />

              <text
                x="95"
                y="45"
                fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                fontSize="24"
                fill="white"
                fontWeight="600"
              >
                QRcards
              </text>
            </svg>
          </div>
        </div>
        <Menu
          className="hidden xs:flex xs:relative w-16 h-16 xs:pt-2"
          onClick={() => {
            setMenu(!menu);
          }}
        />
        {/* nav */}

        <div
          className={`  flex flex-col h-full ${
            menu
              ? "hidden xs:flex xs:absolute bg-violet-100 xs:top-[68px] xs:w-screen xs:h-full xs:items-start xs:pl-5 xs:justify-start xs:z-50"
              : "flex xs:hidden"
          }`}
        >
          <nav className="h-[60%] items-start tb:flex tb:justify-center tb:items-center">
            <ul className="h-full flex flex-col  items-start justify-evenly relative  text-sky-900 font-semibold text-[20px]">
              <li className="text-start font-cp flex items-center ">
                Home{" "}
              </li>
              <li className="text-start font-cp flex items-center ">
                Cards{" "}
              </li>
              <li className="text-start font-cp flex items-center ">
                {" "}
                Features
              </li>
              <li className="text-start font-cp flex items-center ">
                Pricing
              </li>
               <li className="text-start font-cp flex items-center ">
                Contact
              </li>
              <li className="text-start font-cp flex items-center ">
                About
              </li>
            </ul>
          </nav>
          {/* profile */}
          <div
            className={`h-[20%] flex items-center justify-start font-ios  text-sky-900 ${
              menu
                ? "hidden xs:flex xs:relative bg-violet-100 xs:top-[10px]  xs:z-50"
                : "flex mt-16  xs:hidden tb:flex tb:justify-center tb:items-center"
            }`}
          >
            <div className="font-bold text-[25px] flex justify-end gap-0 ">
              Profile
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Header;
