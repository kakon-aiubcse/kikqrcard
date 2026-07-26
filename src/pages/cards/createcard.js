"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import {
  Heart,
  Save,
  Star,
  Workflow,
  BookOpenCheck,
  PinIcon,
  Download,
  Check,
} from "lucide-react";
import axios from "axios";
import { Seo } from "@/components/seo";
import DashboardShell from "@/components/dashboard-shell";
import Card from "./card";
import { buildVCard, CARD_PATTERNS } from "@/components/business-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
    email: "",
    website: "",
    address: "",
    bgGrad: "bg-gradient-to-tr",
    bgStyle: "from-indigo-500 to-sky-500",
    pattern: "none",
  });

  const { data: session, status } = useSession();
  const [errors, setErrors] = useState({
    name: "",
    quote: "",
    phone: "",
    profession: "",
    email: "",
    website: "",
    address: "",
  });
  const [cardName, setCardName] = useState("kik---qrcard");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [savedCard, setSavedCard] = useState(true);
  const [highlight, setHighlight] = useState(true);
  const [favourite, setFavourite] = useState(true);
  const [lovedCard, setLovedCard] = useState(true);
  const [publicCard, setPublicCard] = useState(true);
  const [isAlreadySaved, setIsAlreadySaved] = useState(false);
  const [isAlreadyPublic, setIsAlreadyPublic] = useState(false);
  const [isAlreadyLoved, setIsAlreadyLoved] = useState(false);
  const [isAlreadyFavourite, setIsAlreadyFavourite] = useState(false);
  const [isAlreadyHighlighted, setIsAlreadyHighlighted] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);

  const router = useRouter();
  const editId = router.query.id;
  const isEditMode = typeof editId === "string" && editId.length > 0;
  const [editLoaded, setEditLoaded] = useState(false);

  useEffect(() => {
    if (!isEditMode) {
      const trimmedName = cardInfo.name.trim().toLowerCase().slice(0, 3);
      const trimmedProfession = cardInfo.profession
        .trim()
        .toLowerCase()
        .slice(0, 3);
      setCardName(`kik${trimmedName}${trimmedProfession}qrcard`);
    }

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
  }, [status, router, isEditMode, cardInfo.name, cardInfo.profession, error, message]);

  useEffect(() => {
    const email = session?.user?.email;
    if (!isEditMode || !email || editLoaded) return;

    let cancelled = false;
    const loadCardForEdit = async () => {
      try {
        const res = await axios.get(
          `/api/getCards/getsavedcard?email=${email}`,
        );
        if (cancelled) return;

        const match = (res.data?.savedCards || []).find(
          (card) => card._id === editId,
        );

        if (!match) {
          setError("Card not found for editing.");
          setEditLoaded(true);
          return;
        }

        setCardInfo({
          name: match.name,
          profession: match.profession,
          phone: match.phone,
          quote: match.quote,
          email: match.contactEmail || "",
          website: match.website || "",
          address: match.address || "",
          bgGrad: match.bgGrad,
          bgStyle: match.bgStyle,
          pattern: match.pattern || "none",
        });
        setCardName(match.cardName);
        setEditLoaded(true);
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load card for editing.");
          setEditLoaded(true);
          console.error("Error loading card:", err.message);
        }
      }
    };

    loadCardForEdit();

    return () => {
      cancelled = true;
    };
  }, [session, isEditMode, editId, editLoaded]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (message) toast.success(message);
  }, [message]);

  useEffect(() => {
    const email = session?.user?.email;
    if (!email || !cardName) return;

    const normalizedCardName = cardName.toLowerCase();
    let cancelled = false;

    const checkStatus = async () => {
      try {
        const [savedRes, allRes, lovedRes, favouriteRes, highlightedRes] =
          await Promise.all([
            axios.get(`/api/getCards/getsavedcard?email=${email}`),
            axios.get(`/api/getCards/getallcards`),
            axios.get(`/api/getCards/getlovedcard?email=${email}`),
            axios.get(`/api/getCards/getfavouritecard?email=${email}`),
            axios.get(`/api/getCards/gethighlightedcard?email=${email}`),
          ]);

        if (cancelled) return;

        const savedMatch = (savedRes.data?.savedCards || []).some(
          (card) => card.cardName === normalizedCardName,
        );
        const publicMatch = (allRes.data?.allcards || []).some(
          (card) =>
            card.email === email && card.cardName === normalizedCardName,
        );
        const lovedMatch = (lovedRes.data?.lovedCards || []).some(
          (card) => card.cardName === normalizedCardName,
        );
        const favouriteMatch = (favouriteRes.data?.favouriteCards || []).some(
          (card) => card.cardName === normalizedCardName,
        );
        const highlightedMatch = (
          highlightedRes.data?.highlightedCards || []
        ).some((card) => card.cardName === normalizedCardName);

        setIsAlreadySaved(savedMatch);
        setIsAlreadyPublic(publicMatch);
        setIsAlreadyLoved(lovedMatch);
        setIsAlreadyFavourite(favouriteMatch);
        setIsAlreadyHighlighted(highlightedMatch);
      } catch (err) {
        console.error("Error checking card status:", err.message);
      }
    };

    checkStatus();

    return () => {
      cancelled = true;
    };
  }, [session, cardName]);

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

  const validateEmail = (value) => {
    if (!value) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Enter a valid email.";
    }
    return "";
  };

  const validateWebsite = (value) => {
    if (!value) return "";
    if (!/^https?:\/\/[^\s]+\.[^\s]+$/.test(value)) {
      return "Enter a valid URL (http:// or https://).";
    }
    return "";
  };

  const validateAddress = (value) => {
    if (value.length > 60) {
      return "Max 60 characters.";
    }
    return "";
  };
  const handleSaveCard = async () => {
    if (isAlreadySaved && !isEditMode) return;
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

      if (isEditMode) {
        const response = await axios.put("/api/cards/updateCard", {
          id: editId,
          email: session?.user?.email,
          cardName: cardName,
          name: cardInfo.name,
          profession: cardInfo.profession,
          phone: cardInfo.phone,
          quote: cardInfo.quote,
          contactEmail: cardInfo.email,
          website: cardInfo.website,
          address: cardInfo.address,
          bgGrad: cardInfo.bgGrad,
          bgStyle: cardInfo.bgStyle,
          pattern: cardInfo.pattern,
        });

        if (response.status === 200) {
          setMessage("Card updated successfully!");
        } else {
          setError("Failed to update card.");
        }
        return;
      }

      const response = await axios.post("/api/cards/saveCards", {
        email: session?.user?.email,
        cardName: cardName,
        name: cardInfo.name,
        profession: cardInfo.profession,
        phone: cardInfo.phone,
        quote: cardInfo.quote,
        contactEmail: cardInfo.email,
        website: cardInfo.website,
        address: cardInfo.address,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        pattern: cardInfo.pattern,
        savedCard: savedCard,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Card saved successfully!");
        setIsAlreadySaved(true);
        console.log(response.data);
      } else {
        setError("Failed to save card.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
        setIsAlreadySaved(true);
      } else if (error.response?.status === 403) {
        setError(error.response.data?.error || "Virtual card limit reached.");
      } else {
        setError(isEditMode ? "Error updating card." : "Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleHighlightedCard = async () => {
    if (isAlreadyHighlighted) return;
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
        contactEmail: cardInfo.email,
        website: cardInfo.website,
        address: cardInfo.address,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        pattern: cardInfo.pattern,
        ishighlighted: highlight,
      });

      setMessage("Card added to highlighted section successfully!");
      setIsAlreadyHighlighted(true);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
        setIsAlreadyHighlighted(true);
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleFavouriteCard = async () => {
    if (isAlreadyFavourite) return;
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
        contactEmail: cardInfo.email,
        website: cardInfo.website,
        address: cardInfo.address,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        pattern: cardInfo.pattern,
        isfavourite: favourite,
      });

      setMessage("Card added to Favourite section successfully!");
      setIsAlreadyFavourite(true);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
        setIsAlreadyFavourite(true);
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handleLovedCard = async () => {
    if (isAlreadyLoved) return;
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
        contactEmail: cardInfo.email,
        website: cardInfo.website,
        address: cardInfo.address,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        pattern: cardInfo.pattern,
        isloved: lovedCard,
      });

      setMessage("Card added to Loved section successfully!");
      setIsAlreadyLoved(true);
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
        setIsAlreadyLoved(true);
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };
  const handlPuliccard = async () => {
    if (isAlreadyPublic) return;
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
        contactEmail: cardInfo.email,
        website: cardInfo.website,
        address: cardInfo.address,
        bgGrad: cardInfo.bgGrad,
        bgStyle: cardInfo.bgStyle,
        pattern: cardInfo.pattern,
        publicCard: publicCard,
      });

      if (response.status === 201 || response.status === 200) {
        setMessage("Card added as public card successfully!");
        setIsAlreadyPublic(true);
        console.log(response.data);
      } else {
        setError("Failed to add card.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("This Card with same name and design exists.");
        setIsAlreadyPublic(true);
      } else {
        setError("Error saving card.");
        console.error("Error Saving Card:", error.message);
      }
    }
  };

  const actionButtons = [
    {
      label: "Love",
      activeLabel: "Loved",
      icon: Heart,
      onClick: handleLovedCard,
      active: isAlreadyLoved,
      activeClass: "border-red-500 bg-red-50 text-red-600 dark:bg-red-950/40",
    },
    {
      label: "Favourite",
      activeLabel: "Favourited",
      icon: Star,
      onClick: handleFavouriteCard,
      active: isAlreadyFavourite,
      activeClass:
        "border-yellow-500 bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40",
    },
    {
      label: "Highlight",
      activeLabel: "Highlighted",
      icon: PinIcon,
      onClick: handleHighlightedCard,
      active: isAlreadyHighlighted,
      activeClass:
        "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950/40",
    },
    {
      label: isEditMode ? "Update" : "Save",
      activeLabel: "Saved",
      icon: Save,
      onClick: handleSaveCard,
      active: !isEditMode && isAlreadySaved,
      activeClass:
        "border-green-500 bg-green-50 text-green-600 dark:bg-green-950/40",
    },
    {
      label: "Public",
      activeLabel: "Public",
      icon: BookOpenCheck,
      onClick: handlPuliccard,
      active: isAlreadyPublic,
      activeClass:
        "border-green-500 bg-green-50 text-green-600 dark:bg-green-950/40",
    },
    { label: "QR Config", icon: Workflow, onClick: () => setQrDialogOpen(true) },
  ];

  const downloadQrCode = () => {
    const svg = document.getElementById("card-qr-preview");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${cardName}-qr.png`;
      link.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  };

  return (
    <div className="md:pl-64">
      <Seo title="Create Card" path="/cards/createcard" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {isEditMode ? "Edit Card" : "Create Card"}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {isEditMode
                  ? "Update your saved card details."
                  : "Set up your card carefully."}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant={isAlreadySaved ? "default" : "outline"}>
                {isAlreadySaved ? "Saved" : "Not saved"}
              </Badge>
              <Badge variant={isAlreadyPublic ? "default" : "outline"}>
                {isAlreadyPublic ? "Public" : "Not public"}
              </Badge>
            </div>
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

                <div className="space-y-1.5">
                  <Label>Pattern</Label>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(CARD_PATTERNS).map(([key, def]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCardInfo({ ...cardInfo, pattern: key })}
                        title={def.label}
                        className={cn(
                          "relative h-10 w-16 overflow-hidden rounded-md border-2 text-white transition-transform hover:scale-105",
                          cardInfo.pattern === key
                            ? "border-primary"
                            : "border-border",
                          cardInfo.bgGrad,
                          cardInfo.bgStyle,
                        )}
                      >
                        {def.overlayStyle && (
                          <span
                            aria-hidden
                            className={cn("absolute inset-0", def.overlayClass)}
                            style={def.overlayStyle}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {CARD_PATTERNS[cardInfo.pattern]?.label || "Plain"}
                  </p>
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
                  email={cardInfo.email}
                  website={cardInfo.website}
                  address={cardInfo.address}
                  bgGrad={cardInfo.bgGrad}
                  bgStyle={cardInfo.bgStyle}
                  pattern={cardInfo.pattern}
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
                {actionButtons.map(
                  ({ label, activeLabel, icon: Icon, onClick, active, activeClass }) => (
                    <Button
                      key={label}
                      type="button"
                      variant="outline"
                      onClick={onClick}
                      disabled={active}
                      className={cn(
                        "flex-col gap-1.5 py-4 h-auto",
                        active && activeClass,
                        active && "disabled:opacity-100",
                      )}
                    >
                      {active ? (
                        <Check className="size-5" />
                      ) : (
                        <Icon className="size-5" />
                      )}
                      {active ? activeLabel : label}
                    </Button>
                  ),
                )}
              </div>
            </CardContent>
          </UICard>
        </div>
      </main>

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code Config</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="rounded-md bg-white p-4 shadow-sm">
              <QRCode
                id="card-qr-preview"
                value={buildVCard(cardInfo)}
                size={180}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Scan to save {cardInfo.name}&apos;s contact card.
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4">
            <p className="text-sm font-medium text-foreground">
              Extra contact details (optional)
            </p>
            <div className="space-y-1.5">
              <Label htmlFor="qr-email">Email</Label>
              <Input
                id="qr-email"
                type="email"
                value={cardInfo.email}
                onChange={(e) => {
                  const val = e.target.value;
                  setCardInfo({ ...cardInfo, email: val });
                  setErrors({ ...errors, email: validateEmail(val) });
                }}
                placeholder="name@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="qr-website">Website</Label>
              <Input
                id="qr-website"
                value={cardInfo.website}
                onChange={(e) => {
                  const val = e.target.value;
                  setCardInfo({ ...cardInfo, website: val });
                  setErrors({ ...errors, website: validateWebsite(val) });
                }}
                placeholder="https://example.com"
                aria-invalid={!!errors.website}
              />
              {errors.website && (
                <p className="text-sm text-destructive">{errors.website}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="qr-address">Address</Label>
              <Input
                id="qr-address"
                value={cardInfo.address}
                onChange={(e) => {
                  const val = e.target.value;
                  setCardInfo({ ...cardInfo, address: val });
                  setErrors({ ...errors, address: validateAddress(val) });
                }}
                placeholder="Street, City"
                aria-invalid={!!errors.address}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={downloadQrCode}>
              <Download className="size-4" />
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
