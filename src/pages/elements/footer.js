//footer page
import React from "react";

const Footer = () => {
  return (
    <>
   
      <div className="w-screen h-[300px] flex space-x-6 xs:flex xs:flex-col  ">
        <div className="flex relative  w-screen justify-evenly pr-96 items-center xs:flex-col  xs:pr-16 tb:pr-36 lps:pr-44">
          <div
            className="flex  items-center justify-center h-full mx-4 mt-[80px] "
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
          <div className="flex flex-col items-start justify-start  relative top-[18px] ">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Getting Started</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">How it works?</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Cards</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Features</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Pricing</li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start  xs:pr-8 xs:relative xs:top-4">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Connect us</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Contact</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Terms and Condition</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">FAQ</li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start   xs:pr-16 xs:mb-60 xs:top-4">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Dashboard</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Profile</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Sign up</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400">Log in</li>
            </ul>
            <span className="w-screen absolute  xs:mt-[450px]  bg-slate-300 h-[1px] right-[1px] lp:right-1 xb:top-[300px] lp:top-[280px] tb:left-5 tb:top-[270px] "></span>
             <span className="w-screen absolute flex items-center justify-center xs:mt-[450px]   h-[20px] right-[1px] lp:right-1 xb:top-[310px] lp:top-[290px] tb:left-2 tb:top-[280px] ">
<span className="text-xs text-slate-600 font-ios">
  &copy; All Rights Reserved, 2025
</span>
             </span>
          </div>
         
        </div>
        
      </div>
     
    </>
  );
};

export default Footer;
