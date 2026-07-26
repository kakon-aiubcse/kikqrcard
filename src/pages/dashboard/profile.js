//user dashboard/profile
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { HandHeart, Heart, CreditCard, ShoppingBag, Pencil, ShoppingCart, Trash, MoreVertical } from "lucide-react";
import Card from "../cards/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card as UICard,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const STAT_CARDS = [
  { key: "loved", label: "Liked Cards", icon: HandHeart },
  { key: "favourite", label: "Favourited Card", icon: Heart },
  { key: "saved", label: "Card Created", icon: CreditCard },
  { key: "orders", label: "Total Orders", icon: ShoppingBag },
];

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    cardName: "",
    name: "",
    email: "",
    phone: "",
    profileImageBase64: "",
  });
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [favouriteCards, setFavouriteCards] = useState([]);
  const [lovedCards, setLovedCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const useremail = session?.user?.email;
    if (!useremail) return;

    const fetchUserAndHighlighted = async () => {
      try {
        // Fetch user data
        const res = await fetch("/api/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: useremail }),
        });

        const data = await res.json();
        if (res.ok) {
          setUserData({
            cardName: data.cardName,
            name: data.name,
            email: data.email,
            phone: data.phone,
            profileImageBase64: data.profileImageBase64,
          });
        } else {
          console.error("Error fetching user:", data.error);
        }
        //fetching data
        const fetchCards = async () => {
          try {
            const [favouriteRes, lovedRes, savedRes] = await Promise.all([
              fetch(`/api/getCards/getfavouritecard?email=${useremail}`),
              fetch(`/api/getCards/getlovedcard?email=${useremail}`),
              fetch(`/api/getCards/getsavedcard?email=${useremail}`),
            ]);

            const favouriteData = await favouriteRes.json();
            const lovedData = await lovedRes.json();
            const savedcardData = await savedRes.json();

            setFavouriteCards(favouriteData.favouriteCards || []);
            setLovedCards(lovedData.lovedCards || []);
            setSavedCards(savedcardData.savedCards || []);
          } catch (error) {
            console.error("Failed to fetch cards:", error);
          }
        };

        fetchCards();

        // Fetch highlighted cards
        const highlightRes = await fetch(
          `/api/getCards/gethighlightedcard?email=${useremail}`
        );
        const highlightData = await highlightRes.json();
        setHighlightedCards(highlightData.highlightedCards || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUserAndHighlighted();
  }, [session]);

  const handlehighlightedcardDelete = async (id, cardName) => {
    try {
      const res = await fetch(`/api/deletecard/deletehighlightedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHighlightedCards((prev) => prev.filter((card) => card._id !== id));
        toast.success(`Card deleted successfully: ${cardName}`);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    }
  };

  const statValues = {
    loved: lovedCards.length,
    favourite: favouriteCards.length,
    saved: savedCards.length,
    orders: 3,
  };

  const initials = userData.name
    ? userData.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("")
    : "U";

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Avatar size="lg" className="size-16 sm:size-20">
          <AvatarImage src={userData.profileImageBase64 || undefined} alt={userData.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            {userData.name || "Welcome"}
          </h1>
          <p className="text-sm text-muted-foreground">Here&apos;s an overview of your account.</p>
        </div>
      </div>

      {/* Personal Details */}
      <UICard>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Name</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {userData.name || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Email</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {userData.email || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Phone Number</dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                {userData.phone || "—"}
              </dd>
            </div>
          </dl>
        </CardContent>
      </UICard>

      {/* Activity stats */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Activity</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon: Icon }) => (
            <UICard key={key}>
              <CardContent className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{statValues[key]}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </UICard>
          ))}
        </div>
      </div>

      {/* Highlighted cards */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">Highlighted Card</h2>

        {highlightedCards?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {highlightedCards.map((highlightedCard, index) => (
              <div
                key={highlightedCard._id ?? index}
                className="relative flex justify-center rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <Card
                  name={highlightedCard.name}
                  profession={highlightedCard.profession}
                  phone={highlightedCard.phone}
                  quote={highlightedCard.quote}
                  bgGrad={highlightedCard.bgGrad}
                  bgStyle={highlightedCard.bgStyle}
                  pattern={highlightedCard.pattern}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-3 top-3 size-8 rounded-full shadow"
                      />
                    }
                  >
                    <MoreVertical className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/dashboard/editprofile")}>
                      <Pencil className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/payment/orders")}>
                      <ShoppingCart className="size-4" />
                      Order
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() =>
                        handlehighlightedcardDelete(
                          highlightedCard._id,
                          highlightedCard.cardName
                        )
                      }
                    >
                      <Trash className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            All highlighted cards will display here.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
