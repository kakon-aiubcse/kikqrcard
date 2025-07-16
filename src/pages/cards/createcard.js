"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import QRCode from "react-qr-code";
import Sidebar from "../dashboard/sidebar";
import { Heart, Save, Star, Workflow, BookOpenCheck } from "lucide-react";

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
  " from-sky-400 to-violet-600",
  " from-green-600 via-red-600 to-green-600",
  " from-purple-600 to-fuchsia-500",
  " from-orange-600 via-amber-400 to-red-500",
  " from-pink-500 via-sky-400 to-sky-900",
  " from-yellow-400 to-yellow-600",
  " from-cyan-500 via-sky-600 to-blue-600",
  " from-red-600 to-slate-950",
  " from-teal-600 to-slate-900",
  " from-gray-700 via-amber-800 to-slate-950",
];

export default function CreateCard() {
  const [cardInfo, setCardInfo] = useState({
    name: "User Name",
    profession: "User Profession",
    phone: "User Number",
    quote: "User's Quote",
    bgGrad: "bg-gradient-to-tr",
    bgStyle: "from-indigo-500 to-sky-500",
  });

  const { data: session, status } = useSession();
  const [errors, setErrors] = useState({
    name: "",
    quote: "",
    phone: "",
    profession: "",
  });
  const [cardName, setCardName] = useState("kik---qrcard");

  const router = useRouter();

  useEffect(() => {
    const trimmedName = cardInfo.name.trim().toLowerCase().slice(0, 3);
     const trimmedProfession = cardInfo.profession.trim().toLowerCase().slice(0, 3);
    setCardName(`kik${trimmedName}${trimmedProfession}qrcard`);

    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status, router, cardInfo.name]);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-violet-600 font-semibold">
          Checking session...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-brand font-semibold">
          You are not logged in. Redirecting to login page...
        </p>
      </div>
    );
  }
  const validateName = (value) => {
    if (!/^[A-Za-z\s]{1,20}$/.test(value)) {
      return "Max 20 letters. No numbers.";
    }
    return "";
  };

  const validatequote = (value) => {
    if (value.length > 25) {
      return "Max 25 characters.";
    }
    return "";
  };

  const validatePhone = (value) => {
    if (!/^\d{1,11}$/.test(value)) {
      return "Digits only, max 11.";
    }
    return "";
  };

  const validateProfession = (value) => {
    if (!/^[A-Za-z\s]{1,30}$/.test(value)) {
      return "Max 30 letters. No numbers.";
    }
    return "";
  };

  return (
    <>
      <div className="flex ml-[8%] xs:ml-[0%]  overflow-y-hidden xs:overflow-x-hidden">
        <Sidebar />

        <div className="flex flex-col items-center w-screen min-h-screen p-2 xs:p-0 xs:top-32 xs:relative xs:right-4 overflow-x-hidden bg-gray-100">
          {/* Header */}
          <h1 className="text-5xl font-bold text-brand flex "> Create Card</h1>

          {/* Form */}
          <span className="flex relative right-96 m-3 text-slate-400 font-cp xs:right-16">
            Set up your card dynamically:
          </span>
          <div className="grid md:grid-cols-2 gap-4 w-full max-w-6xl px-6 mb-8 ml-[10%]">
            <input
              value={cardInfo.name}
              onChange={(e) => {
                const val = e.target.value;
                setCardInfo({ ...cardInfo, name: val });
                setErrors({ ...errors, name: validateName(val) });
              }}
              placeholder="Name"
              className={`p-2 rounded border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}

            <input
              value={cardInfo.profession}
              onChange={(e) => {
                const val = e.target.value;
                setCardInfo({ ...cardInfo, profession: val });
                setErrors({ ...errors, profession: validateProfession(val) });
              }}
              placeholder="Profession"
              className={`p-2 rounded border ${
                errors.profession ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400`}
            />
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">{errors.profession}</p>
            )}

            <input
              value={cardInfo.phone}
              onChange={(e) => {
                const val = e.target.value;
                setCardInfo({ ...cardInfo, phone: val });
                setErrors({ ...errors, phone: validatePhone(val) });
              }}
              placeholder="Phone"
              className={`p-2 rounded border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}

            <input
              value={cardInfo.quote}
              onChange={(e) => {
                const val = e.target.value;
                setCardInfo({ ...cardInfo, quote: val });
                setErrors({ ...errors, quote: validatequote(val) });
              }}
              placeholder="User's Quotes"
              className={`p-2 rounded border ${
                errors.quote ? "border-red-500" : "border-gray-300"
              } hover:border-gray-400 focus:border-brand focus:outline-none w-full text-slate-600 placeholder-slate-400`}
            />
            {errors.quote && (
              <p className="text-red-500 text-sm mt-1">{errors.quote}</p>
            )}

            {/* Direction Picker */}
            <select
              value={cardInfo.bgGrad}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, bgGrad: e.target.value })
              }
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
          <div className="flex flex-wrap gap-3 mb-6 ml-[10%] hover:scale-110 transition-transform duration-500 border border-brand rounded-2xl p-2">
            {bgStyles.map((bg, i) => (
              <div
                key={i}
                onClick={() => setCardInfo({ ...cardInfo, bgStyle: bg })}
                className={`cursor-pointer w-16 h-10 rounded-md border-2 ${
                  cardInfo.bgStyle === bg
                    ? "border-brand scale-110"
                    : "border-gray-200"
                } ${cardInfo.bgGrad} ${bg} transition-transform`}
                title={bg}
              ></div>
            ))}
          </div>

          {/* Card Display */}
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
                className={`flex flex-col h-[280px] w-[30%] xs:w-[380%]  lp:w-[38%] tb:w-[75%] hover:shadow-2xl hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${cardInfo.bgGrad}${cardInfo.bgStyle} bg-black text-white 
               xs:w-screen xs:m-0 xs:mx-1 order-2`}
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
                      {cardInfo.quote}
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
                   hover:shadow-[#8F87F1]  p-1 m-5 rounded-[20px] ${cardInfo.bgGrad}${cardInfo.bgStyle} bg-black text-white 
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
                    {cardInfo.name}
                  </span>
                  <span className="text-base font-cp font-semibold relative bottom-16 text-slate-300">
                    {cardInfo.profession}
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
                    {cardInfo.phone}
                  </span>
                </div>
              </div>
            </div>
         
          </div>
             <div className="flex flex-col mr-[28%] p-4 m-4 xs:mr-[0%]  rounded-lg hover:scale-110 transition-transform duration-500">
              <div className="bg-white rounded-xl shadow-md p-4 border border-brand">
                <h2 className="text-xl font-semibold text-brand mb-2">
                  Card Preview Info
                </h2>

                <p className="text-slate-700 text-base mb-1">
                  <span className="font-semibold text-slate-600">
                    Card Name:
                  </span>{" "}
                  <span className="text-brand font-medium">{cardName}</span>
                </p>

                <p className="text-slate-700 text-base leading-6">
                  <span className="font-semibold text-slate-600">
                    Card Description:
                  </span>{" "}
                  Name: <span className="text-slate-500">{cardInfo.name}</span>,
                  Profession:{" "}
                  <span className="text-slate-500">{cardInfo.profession}</span>,
                  Quote:{" "}
                  <span className="text-slate-500">{cardInfo.slogan}</span>,
                  Phone:{" "}
                  <span className="text-slate-500">{cardInfo.phone}</span>
                </p>
              </div>
            </div>
          <div className="flex gap-10 p-6 m-4 mb-72 border border-brand rounded-lg hover:scale-110 transition-transform duration-500 xs:flex-col ">
            <button className="flex justify-center items-center font-cp text-xl font-semibold hover:text-brand ">
              <Heart className="" />
              Love
            </button>
            <button className="flex justify-center items-center font-cp text-xl font-semibold hover:text-brand ">
              <Star /> Favourites
            </button>
            <button className="flex justify-center items-center font-cp text-xl font-semibold hover:text-brand ">
              <Save /> Save
            </button>
            <button className="flex justify-center items-center font-cp text-xl font-semibold hover:text-brand ">
              <BookOpenCheck /> Public
            </button>
            <button className="flex justify-center items-center font-cp text-xl font-semibold hover:text-brand ">
              <Workflow /> QRcodeconfig
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
