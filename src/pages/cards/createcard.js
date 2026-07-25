"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Heart,
  Save,
  Star,
  Workflow,
  BookOpenCheck,
  PinIcon,
} from "lucide-react";
import axios from "axios";
import DashboardShell from "@/components/dashboard-shell";
import Card from "./card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (message) toast.success(message);
  }, [message]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-primary">
          Checking session...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen items-center justify-center px-4 text-center">
        <p className="text-2xl font-semibold text-primary">
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

  const actionButtons = [
    { label: "Love", icon: Heart, onClick: handleLovedCard },
    { label: "Favourite", icon: Star, onClick: handleFavouriteCard },
    { label: "Highlight", icon: PinIcon, onClick: handleHighlightedCard },
    { label: "Save", icon: Save, onClick: handleSaveCard },
    { label: "Public", icon: BookOpenCheck, onClick: handlPuliccard },
    { label: "QR Config", icon: Workflow, onClick: undefined },
  ];

  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Create Card
            </h1>
            <p className="mt-1 text-muted-foreground">
              Set up your card carefully.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* left column: form */}
            <UICard>
              <CardHeader>
                <CardTitle>Card details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={cardInfo.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCardInfo({ ...cardInfo, name: val });
                      setErrors({ ...errors, name: validateName(val) });
                    }}
                    placeholder="Name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      Name error: {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={cardInfo.profession}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCardInfo({ ...cardInfo, profession: val });
                      setErrors({
                        ...errors,
                        profession: validateProfession(val),
                      });
                    }}
                    placeholder="Profession"
                    aria-invalid={!!errors.profession}
                  />
                  {errors.profession && (
                    <p className="text-sm text-destructive">
                      Profession error: {errors.profession}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={cardInfo.phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCardInfo({ ...cardInfo, phone: val });
                      setErrors({ ...errors, phone: validatePhone(val) });
                    }}
                    placeholder="Phone"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">
                      Phone error: {errors.phone}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="quote">Quote</Label>
                  <Input
                    id="quote"
                    value={cardInfo.quote}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCardInfo({ ...cardInfo, quote: val });
                      setErrors({ ...errors, quote: validatequote(val) });
                    }}
                    placeholder="User's Quotes"
                    aria-invalid={!!errors.quote}
                  />
                  {errors.quote && (
                    <p className="text-sm text-destructive">
                      Quote error: {errors.quote}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bgGrad">Gradient direction</Label>
                  <Select
                    value={cardInfo.bgGrad}
                    onValueChange={(val) =>
                      setCardInfo({ ...cardInfo, bgGrad: val })
                    }
                  >
                    <SelectTrigger id="bgGrad" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {bgDirections.map((dir) => (
                        <SelectItem key={dir} value={dir}>
                          {dir}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Color style</Label>
                  <div className="flex flex-wrap gap-3">
                    {bgStyles.map((bg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCardInfo({ ...cardInfo, bgStyle: bg })}
                        className={cn(
                          "h-10 w-16 rounded-md border-2 transition-transform hover:scale-105",
                          cardInfo.bgStyle === bg
                            ? "border-primary"
                            : "border-border",
                          cardInfo.bgGrad,
                          bg,
                        )}
                        title={bg}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </UICard>

            {/* right column: preview */}
            <div className="space-y-6 md:sticky md:top-8 md:self-start">
              <div className="flex justify-center rounded-2xl border border-border bg-card p-4 shadow-sm">
                <Card
                  name={cardInfo.name}
                  profession={cardInfo.profession}
                  phone={cardInfo.phone}
                  quote={cardInfo.quote}
                  bgGrad={cardInfo.bgGrad}
                  bgStyle={cardInfo.bgStyle}
                />
              </div>

              <UICard>
                <CardHeader>
                  <CardTitle>Card Preview Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-foreground">
                      Card Name:
                    </span>{" "}
                    <span className="font-medium text-primary">{cardName}</span>
                  </p>
                  <p className="leading-6 text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Card Description:
                    </span>{" "}
                    Name: <span>{cardInfo.name}</span>, Profession:{" "}
                    <span>{cardInfo.profession}</span>, Quote:{" "}
                    <span>{cardInfo.quote}</span>, Phone:{" "}
                    <span>{cardInfo.phone}</span>
                  </p>
                </CardContent>
              </UICard>
            </div>
          </div>

          {/* Card functionalities */}
          <UICard>
            <CardHeader>
              <CardTitle>Card actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {actionButtons.map(({ label, icon: Icon, onClick }) => (
                  <Button
                    key={label}
                    type="button"
                    variant="outline"
                    onClick={onClick}
                    className="flex-col gap-1.5 py-4 h-auto"
                  >
                    <Icon className="size-5" />
                    {label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </UICard>
        </div>
      </main>
    </div>
  );
}
