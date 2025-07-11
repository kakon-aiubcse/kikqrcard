//header

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

const Header = ({ sectionref }) => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);

  const [activeSection, setActiveSection] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionref || !Array.isArray(sectionref)) return;

      const scrollPosition = window.scrollY + 120;

      sectionref.forEach((ref) => {
        if (!ref || !ref.current) return;

        const section = ref.current;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionref]);
  return (
    <>
      {" "}
      <div className="flex flex-col h-screen bg-violet-100 xs:fixed xs:top-0 xs:left-0 xs:z-[999]  xs:w-screen xs:flex xs:flex-row xs:items-start xs:justify-around xs:h-auto ">
        {/* logo */}

        <div className="h-[20%] items-center justify-center top-5 relative xs:top-3 xs:py-1 ">
          <div
            className=" items-center "
            onClick={() => {
              router.push("/");
            }}
          >
            <svg
              width="150"
              height="40"
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
        <div className="hidden xs:flex xs:relative  xs:pt-2 xs:mb-3">
          {menu ? (
            <X
              className="xs:bg-brand xs:rounded-2xl  xs:text-red-600  xs:p-2 w-12 h-12  cursor-pointer"
              onClick={() => setMenu(false)}
            />
          ) : (
            <Menu
              className="xs:bg-brand xs:rounded-2xl  xs:p-2 w-12 h-12 xs:text-slate-200  cursor-pointer"
              onClick={() => setMenu(true)}
            />
          )}
        </div>
        {/* nav */}

        <div
          className={`  flex flex-col h-full ${
            menu
              ? "hidden xs:flex xs:fixed bg-violet-100 xs:top-[58px] xs:w-screen xs:h-full xs:items-start xs:pl-5 xs:justify-start xs:z-[300] "
              : " flex xs:hidden"
          }`}
        >
          <nav className="h-[60%] items-start tb:flex tb:justify-center tb:items-center">
            <ul className="h-full flex flex-col  items-start justify-evenly relative  text-sky-900 font-semibold text-[20px]">
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${activeSection === "home" ? "text-violet-600 underline" : ""}`}
                onClick={() => {
                  sectionref[0]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                Home
              </li>
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${
                  activeSection === "cards" ? "text-violet-600 underline" : ""
                }`}
                onClick={() => {
                  sectionref[1]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                Cards
              </li>
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${
                  activeSection === "feature" ? "text-violet-600 underline" : ""
                }`}
                onClick={() => {
                  sectionref[2]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                {" "}
                Features
              </li>
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${
                  activeSection === "pricing" ? "text-violet-600 underline" : ""
                }`}
                onClick={() => {
                  sectionref[3]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                {" "}
                Pricing
              </li>
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${
                  activeSection === "contact" ? "text-violet-600 underline" : ""
                }`}
                onClick={() => {
                  sectionref[4]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                {" "}
                Contact
              </li>
              <li
                className={`text-start font-cp flex items-center 
                xs:pb-3 xs:w-[300px] xs:border-b xs:border-slate-400 
                hover:text-sky-400 hover:underline 
                ${
                  activeSection === "blog" ? "text-violet-600 underline" : ""
                }`}
                onClick={() => {
                  sectionref[5]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setMenu(false);
                }}
              >
                {" "}
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
            <div className="font-bold text-[25px] flex justify-end gap-0 hover:text-sky-400 hover:underline"
            onClick={()=>{router.push("/dashboard/profile")}}>
              Profile
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
