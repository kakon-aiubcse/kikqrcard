import React from "react";
import QRCode from "react-qr-code";
import Logo from "../components/logo"
const urlToEncode = "KIK QR Card";
export default function Card({
  name,
  profession,
  phone,
  quote,
  bgGrad="",
  bgStyle="", 
}) {
  return (
    <div
      className="flex flex-col ml-[30%] md:flex-row items-start justify-center gap-6 
           flex-wrap xs:relative xs:ml-36
            xs:mb-10 "
    >
      <div
        className="flex flex-row items-start justify-center  w-screen   pr-72 hover:scale-105
             transition-transform duration-300 ease-in-out cursor-pointer   xs:hover:scale-100 
             tb:pr-48 tb:flex tb:flex-col tb:items-center tb:justify-start xs:flex xs:flex-col 
             xs:overflow-hidden xs:mb-4 xs:relative xs:right-10 xs:gap-2"
      >
        <div
          className={`flex flex-col h-[280px] w-[30%] xs:w-[380%]  lp:w-[38%] tb:w-[75%] hover:shadow-2xl hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${bgGrad}${bgStyle} bg-black text-white 
               xs:w-screen xs:m-0 xs:mx-1 order-2`}
        >
          <div className="w-full  h-[20%] flex items-start justify-end">
           <Logo/>
          </div>
          <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
            <div className="flex w-1/2 items-center justify-center">
              <span className="shadow-2xl">
                {urlToEncode && <QRCode value={urlToEncode} size={64} />}{" "}
              </span>
            </div>
            <div className="flex flex-col w-1/2">
              <span className="text-xl font-ios text-slate-200 mb-20 mr-2 relative right-20 bottom-4 whitespace-nowrap xs:text-sm xs:right-14">
                {quote}
              </span>
              <span className="font-ios text-xl flex-col relative bottom-10 right-5 ">
                Scan QR
                <img
                  src="/left-arrow.svg"
                  className="flex relative w-[50px] h-[30px] "
                />
              </span>
            </div>
          </div>
          <div className="w-full  h-[10%] flex items-center justify-center">
            <span className="text-xs font-cp font-extralight text-slate-400">
              {" "}
              &copy; 2025, KIK QRcards. All rights reserved.
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col h-[280px] w-[30%] xs:w-[380%]   lp:w-[38%] tb:w-[75%] hover:shadow-2xl
                   hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${bgGrad}${bgStyle} bg-black text-white 
               xs:w-screen xs:m-0 xs:mx-1 order-1`}
        >
          <div className="w-full  h-[20%] flex items-start justify-end">
            <svg
              width="60"
              height="40"
              viewBox="0 0 200 60"
              fill="none"
              fontStyle="italic"
              xmlns="http://www.w3.org/2000/svg"
              className="flex relative right-3"
            >
              <rect
                width="200"
                height="60"
                rx="12"
                ry="12"
                fill="transparent"
              />

              <text
                x="25"
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
          <div className="w-full  h-[70%] flex flex-col items-center justify-center">
            <span className="text-3xl font-ios relative p-5 m-5 bottom-7 font-bold italic text-sky-100 xs:text-xl">
              {name}
            </span>
            <span className="text-base font-cp font-semibold relative bottom-16 text-slate-300">
              {profession}
            </span>
          </div>
          <div className="w-full relative bottom-4 h-[10%] flex items-center justify-center space-x-4">
            <img
              src="/call.svg"
              className="h-[38px] w-[36px] xs:h-[20px] xs:w-[20px]"
            />
            <span
              className=" flex relative xs:text-[12px] font-ios text-slate-300  font-bold
                text-[20px] leading-[30px] tracking-[15px] shadow-2xl"
            >
              {phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
