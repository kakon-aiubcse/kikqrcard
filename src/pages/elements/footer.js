//footer page
import React from "react";
import { useRouter } from "next/router";
import Logoxl from "../components/logoxl";

const Footer = () => {
  const router = useRouter();
  return (
    <>
   
      <div className="w-screen h-[300px] flex space-x-6 xs:flex xs:flex-col  ">
        <div className="flex relative  w-screen justify-evenly pr-96 items-center xs:flex-col  xs:pr-16 tb:pr-36 ">
          <div
            className="flex  items-center justify-center h-full mx-4 mt-[80px] "
            onClick={() => {
              router.push("/");
            }}
          >
          <Logoxl/>
          </div>
          <div className="flex flex-col items-start justify-start  relative top-[18px] ">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Getting Started</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../about/blog">How it works?</a></li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../cards/allcards">Cards</a></li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../about/features">Featuers</a></li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../payment/pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start  xs:pr-8 xs:relative xs:top-4">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Connect us</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../about/contact">Contact</a></li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../about/t&c"></a>Terms and Condition</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../about/faq">FAQ</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-start justify-start   xs:pr-16 xs:mb-60 xs:top-4">
            <h1 className="text-3xl p-2 m-2 font-cp font-semibold text-sky-800 tb:p-1 tb:m-1 tb:text-base">Dashboard</h1>
            <ul className="text-xl px-2 mx-2 font-ios font-light space-y-2 text-slate-700 tb:p-1 tb:m-1 tb:text-base ">
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"> <a href="../dashboard/">Profile</a></li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../authentication/signup"></a>Sign up</li>
              <li className="hover:text-sky-400 hover:underline transition-all duration-400"><a href="../authentication/login">Log in </a></li>
            </ul>
            <span className="w-screen absolute  xs:mt-[450px]  bg-slate-300 h-[1px] right-[1px] lp:right-1 xb:top-[300px] lp:top-[280px] tb:left-5 tb:top-[270px] "></span>
             <span className="w-screen absolute flex items-center justify-center xs:mt-[450px]   h-[20px] right-[1px] lp:right-1 xb:top-[310px] lp:top-[290px] tb:left-2 tb:top-[280px] ">
<span className="text-xs text-slate-600 font-ios">
  &copy; 2025, KIK QRcards. All rights reserved.
</span>
             </span>
          </div>
         
        </div>
        
      </div>
     
    </>
  );
};

export default Footer;
