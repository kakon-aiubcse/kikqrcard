"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import Sidebar from "../dashboard/sidebar";

const urlToEncode = "KIK QR Card";

const bgDirections = [
  "bg-gradient-to-r",
  "bg-gradient-to-l",
  "bg-gradient-to-t",
  "bg-gradient-to-b",
  "bg-gradient-to-tr",
  "bg-gradient-to-br",
  "bg-gradient-to-bl",
  "bg-gradient-to-tl",
];

const bgStyles = [
  " from-indigo-500 to-sky-500",
  " from-green-600 to-emerald-400",
  " from-purple-600 to-fuchsia-500",
  " from-orange-600 to-red-500",
  " from-pink-500 to-rose-400",
  " from-yellow-400 to-yellow-600",
  " from-cyan-500 to-blue-600",
  " from-red-600 to-slate-950",
  " from-teal-600 to-slate-900",
  " from-gray-700 to-gray-900",
];

export default function CreateCard() {
  const [name, setName] = useState("Your name here");
  const [profession, setProfession] = useState(" profession");
  const [phone, setPhone] = useState("ContactNumber");
  const [slogan, setSlogan] = useState("Your Quotes here");
  const [bgGrad, setBgGrad] = useState("bg-gradient-to-l");
  const [bgStyle, setBgStyle] = useState("from-indigo-500 to-sky-500");

  return (
    <>
      <div className="flex ml-[8%] xs:ml-[0%]  overflow-y-hidden ">
        <Sidebar />

        <div className="flex flex-col items-center w-screen min-h-screen p-4 xs:p-0 xs:relative xs:right-4 overflow-x-hidden bg-gray-100">
          {/* Header */}
          <h1 className="text-5xl font-bold text-brand my-6">Create Card</h1>

          {/* Form */}
          <span className="flex relative right-96 m-2 text-brand">
            Set up your card dynamically:
          </span>
          <div className="grid md:grid-cols-2 gap-4 w-full max-w-6xl px-6 mb-8 ml-[10%]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2 rounded border border-gray-300 hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400"
            />

            <input
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="Profession"
              className="p-2 rounded border border-gray-300 hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="p-2 rounded border border-gray-300 hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400"
            />
            <input
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Slogan"
              className="p-2 rounded border border-gray-300 hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400"
            />

            {/* Direction Picker */}
            <select
              value={bgGrad}
              onChange={(e) => setBgGrad(e.target.value)}
              className="p-2 rounded border border-gray-300 hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400"
            >
              {bgDirections.map((dir, i) => (
                <option key={i} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>

          {/* Color Swatches (Optional Visual Picker) */}
          <div className="flex flex-wrap gap-3 mb-6 ml-[10%]">
            {bgStyles.map((bg, i) => (
              <div
                key={i}
                onClick={() => setBgStyle(bg)}
                className={`cursor-pointer w-16 h-10 rounded-md border-2 ${
                  bgStyle === bg
                    ? "border-brand  scale-110"
                    : "border-gray-200 "
                } ${bgGrad} ${bg} transition-transform`}
                title={bg}
              ></div>
            ))}
          </div>

          {/* Card Display */}
          <div className="flex flex-col ml-[20%] md:flex-row items-start justify-center gap-6 
          xs:w-[410px] flex-wrap xs:relative  xs:mb-10">
            <div className="flex flex-row items-start justify-center  w-screen   pr-72 hover:scale-105
             transition-transform duration-300 ease-in-out cursor-pointer   xs:hover:scale-100 
             tb:pr-48 tb:flex tb:flex-col tb:items-center tb:justify-start xs:flex xs:flex-col 
             xs:overflow-hidden  xs:gap-2">
              <div
                className={`flex flex-col h-[280px] w-[30%] xs:w-[405%]  lp:w-[38%] tb:w-[75%] hover:shadow-2xl hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${bgGrad}${bgStyle} bg-black text-white 
               xs:w-screen xs:m-0 xs:mx-1`}
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
                <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
                  <div className="flex w-1/2 items-center justify-center">
                    <span className="shadow-2xl">
                      {urlToEncode && <QRCode value={urlToEncode} size={64} />}{" "}
                    </span>
                  </div>
                  <div className="flex flex-col w-1/2">
                    <span className="text-xl font-ios text-slate-200 mb-20 mr-2 relative right-20 bottom-4 whitespace-nowrap xs:text-sm xs:right-14">
                      {slogan}
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
                  <span className="text-xs font-ios font-extralight text-slate-300">
                    {" "}
                    &copy; 2025, KIK QRcards. All rights reserved.
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-col h-[280px] w-[30%] xs:w-[405%]   lp:w-[38%] tb:w-[75%] hover:shadow-2xl
                   hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${bgGrad}${bgStyle} bg-black text-white 
               xs:w-screen xs:m-0 xs:mx-1`}
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
                  <img src="/call.svg" className="h-[38px] w-[36px] xs:h-[20px] xs:w-[20px]" />
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
        </div>
      </div>
    </>
  );
}
