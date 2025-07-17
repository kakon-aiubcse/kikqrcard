"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Card from "./card";
import Sidebar from "../dashboard/sidebar";
import {
  Heart,
  Save,
  Star,
  Workflow,
  BookOpenCheck,
  PinIcon,
} from "lucide-react";
import axios from "axios";

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
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [savedCard, setSavedCard] = useState(true);
  const [highlight, setHighlight] = useState(true);
  const [favourite, setFavourite] = useState(true);
  const [lovedCard, setLovedCard] = useState(true);
  const [publicCard, setPublicCard] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const trimmedName = cardInfo.name.trim().toLowerCase().slice(0, 3);
    const trimmedProfession = cardInfo.profession
      .trim()
      .toLowerCase()
      .slice(0, 3);
    setCardName(`kik${trimmedName}${trimmedProfession}qrcard`);

    const timer2 = setTimeout(() => {
      setError("");
      setMessage("");
    }, 4000);

    let timer;
    if (status === "unauthenticated") {
      timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);
    }

    return () => {
      clearTimeout(timer2);
      if (timer) clearTimeout(timer);
    };
  }, [status, router, cardInfo.name, cardInfo.profession, error, message]);

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
  const handleSaveCard = async () => {
    try {
      if (
        cardInfo.name === "User Name" ||
        cardInfo.profession === "User Profession" ||
        cardInfo.phone === "User Number" ||
        cardInfo.quote === "User's Quote"
      ) {
        setError("You must complete the card setup to save.");
        return;
      }

      const nameError = validateName(cardInfo.name);
      const professionError = validateProfession(cardInfo.profession);
      const phoneError = validatePhone(cardInfo.phone);
      const quoteError = validatequote(cardInfo.quote);

      if (nameError || professionError || phoneError || quoteError) {
        setError("Enter valid card information before saving.");
        return;
      }

      const response = await axios.post("/api/cards/saveCards", {
        email: session?.user?.email,
        cardName: cardName,
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        savedCard: savedCard,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Card saved successfully!");
        console.log(response.data);
      } else {
        setError("Failed to save card.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleHighlightedCard = async () => {
    try {
      if (
        cardInfo.name === "User Name" ||
        cardInfo.profession === "User Profession" ||
        cardInfo.phone === "User Number" ||
        cardInfo.quote === "User's Quote"
      ) {
        setError("You must complete the card setup to save.");
        return;
      }

      const nameError = validateName(cardInfo.name);
      const professionError = validateProfession(cardInfo.profession);
      const phoneError = validatePhone(cardInfo.phone);
      const quoteError = validatequote(cardInfo.quote);

      if (nameError || professionError || phoneError || quoteError) {
        setError("Enter valid card information before saving.");
        return;
      }

      const response = await axios.post("/api/cards/highlightedCards", {
        email: session?.user?.email,
        cardName: cardName.toLowerCase(),
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        ishighlighted: highlight,
      });

      setMessage("Card added to highlighted section successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleFavouriteCard = async () => {
    try {
      if (
        cardInfo.name === "User Name" ||
        cardInfo.profession === "User Profession" ||
        cardInfo.phone === "User Number" ||
        cardInfo.quote === "User's Quote"
      ) {
        setError("You must complete the card setup to save.");
        return;
      }

      const nameError = validateName(cardInfo.name);
      const professionError = validateProfession(cardInfo.profession);
      const phoneError = validatePhone(cardInfo.phone);
      const quoteError = validatequote(cardInfo.quote);

      if (nameError || professionError || phoneError || quoteError) {
        setError("Enter valid card information before saving.");
        return;
      }

      const response = await axios.post("/api/cards/favouriteCards", {
        email: session?.user?.email,
        cardName: cardName.toLowerCase(),
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        isfavourite: favourite,
      });

      setMessage("Card added to Favourite section successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleLovedCard = async () => {
    try {
      if (
        cardInfo.name === "User Name" ||
        cardInfo.profession === "User Profession" ||
        cardInfo.phone === "User Number" ||
        cardInfo.quote === "User's Quote"
      ) {
        setError("You must complete the card setup to save.");
        return;
      }

      const nameError = validateName(cardInfo.name);
      const professionError = validateProfession(cardInfo.profession);
      const phoneError = validatePhone(cardInfo.phone);
      const quoteError = validatequote(cardInfo.quote);

      if (nameError || professionError || phoneError || quoteError) {
        setError("Enter valid card information before saving.");
        return;
      }

      const response = await axios.post("/api/cards/lovedCards", {
        email: session?.user?.email,
        cardName: cardName.toLowerCase(),
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        isloved: lovedCard,
      });

      setMessage("Card added to Loved section successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handlPuliccard = async () => {
    try {
      if (
        cardInfo.name === "User Name" ||
        cardInfo.profession === "User Profession" ||
        cardInfo.phone === "User Number" ||
        cardInfo.quote === "User's Quote"
      ) {
        setError("You must complete the card setup to save.");
        return;
      }

      const nameError = validateName(cardInfo.name);
      const professionError = validateProfession(cardInfo.profession);
      const phoneError = validatePhone(cardInfo.phone);
      const quoteError = validatequote(cardInfo.quote);

      if (nameError || professionError || phoneError || quoteError) {
        setError("Enter valid card information before saving.");
        return;
      }

      const response = await axios.post("/api/cards/publiccards", {
        email: session?.user?.email,
        cardName: cardName,
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        publicCard: publicCard,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Card added as public card successfully!");
        console.log(response.data);
      } else {
        setError("Failed to add card.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };

  return (
    <>
      <div className="flex ml-[8%] xs:ml-[0%]  overflow-y-hidden xs:overflow-x-hidden ">
        <Sidebar />

        <div className="flex flex-col items-center w-screen min-h-screen p-2 xs:p-0 xs:top-32 xs:relative xs:right-4 overflow-x-hidden bg-gray-100">
          {/* Header */}
          <h1 className="text-5xl font-bold text-brand flex "> Create Card</h1>

          {/* Form */}
          <span className="flex relative right-96 m-3 text-slate-400 font-cp xs:right-16 tb:right-0 xb:right-0">
            Set up your card carefully:
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
          <div className="flex flex-col w-auto h-auto p-2">
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                Name error: {errors.name}
              </p>
            )}
            {errors.profession && (
              <p className="text-red-500 text-sm mt-1">
                Profession error:{errors.profession}
              </p>
            )}
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                Phone error: {errors.phone}
              </p>
            )}
            {errors.quote && (
              <p className="text-red-500 text-sm mt-1">
                Quote errro: {errors.quote}
              </p>
            )}
          </div>

          {/* Color Swatches (Optional Visual Picker) */}
          <div className="flex flex-wrap gap-3 mb-6 ml-[10%] hover:scale-110 transition-transform duration-500 hover:border hover:border-brand rounded-2xl p-2">
            {bgStyles.map((bg, i) => (
              <div
                key={i}
                onClick={() => setCardInfo({ ...cardInfo, bgStyle: bg })}
                className={`cursor-pointer w-16 h-10 rounded-md border-2 ${
                  cardInfo.bgStyle === bg
                    ? "border-brand scale-110 "
                    : "border-gray-200"
                } ${cardInfo.bgGrad} ${bg} transition-transform`}
                title={bg}
              ></div>
            ))}
          </div>

          {/* Card Display */}
          <Card
            name={cardInfo.name}
            profession={cardInfo.profession}
            phone={cardInfo.phone}
            quote={cardInfo.quote}
            bgGrad={cardInfo.bgGrad}
            bgStyle={cardInfo.bgStyle}
          />

          {/* card preview section */}
          <div className="flex flex-col lp:mr-[1%] p-4 m-4 xs:mr-[0%] tb:mr-[0%] xb:ml-44 tb:p-8 rounded-lg hover:scale-110 transition-transform duration-500">
            <div className="bg-white rounded-xl shadow-md p-4 border border-brand tb:relative tb:left-5 ">
              <h2 className="text-xl font-semibold text-brand mb-2">
                Card Preview Info
              </h2>

              <p className="text-slate-700 text-base mb-1">
                <span className="font-semibold text-slate-600">Card Name:</span>{" "}
                <span className="text-brand font-medium">{cardName}</span>
              </p>

              <p className="text-slate-700 text-base leading-6">
                <span className="font-semibold text-slate-600">
                  Card Description:
                </span>{" "}
                Name: <span className="text-slate-500">{cardInfo.name}</span>,
                Profession:{" "}
                <span className="text-slate-500">{cardInfo.profession}</span>,
                Quote: <span className="text-slate-500">{cardInfo.slogan}</span>
                , Phone:{" "}
                <span className="text-slate-500">{cardInfo.phone}</span>
              </p>
            </div>
          </div>
          {/* Card functionalities */}
          <div className="flex gap-10 p-6 m-4 relative top-16 mb-72 border tb:gap-3 tb:ml-20 xb:ml-44 tb:p-2 border-brand rounded-lg hover:scale-110 tb:hover:scale-105 transition-transform duration-500 xs:flex-col xs:items-start ">
            <button
              onClick={() => {
                handleLovedCard();
              }}
              className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand"
            >
              <Heart /> Love
            </button>

            <button
              onClick={() => {
                handleFavouriteCard();
              }}
              className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand"
            >
              <Star /> Favourite
            </button>
            <button
              onClick={() => {
                handleHighlightedCard();
              }}
              className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand"
            >
              <PinIcon /> Highlight
            </button>
            <button
              onClick={() => {
                handleSaveCard();
              }}
              className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand"
            >
              <Save /> Save
            </button>

            <button
              onClick={() => {
                handlPuliccard();
              }}
              className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand "
            >
              <BookOpenCheck /> Public
            </button>
            <button className="flex justify-center items-center font-cp text-xl font-semibold tb:text-lg hover:text-brand ">
              <Workflow /> QRcodeconfig
            </button>
          </div>
          <div className="flex h-10 w-40 relative bottom-96 right-72 whitespace-nowrap tb:right-44 xs:right-16 xs:bottom-[720px]">
            {error && (
              <p className="text-red-600 mt-2 transition-all font-cp font-medium duration-500 ease-in">
                {error}
              </p>
            )}
            {message && (
              <p className="text-green-600 mt-2 transition-all font-cp font-medium duration-500 ease-in">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
