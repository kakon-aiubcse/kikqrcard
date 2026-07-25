//all selected or created cards display
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Trash, ShoppingCart, Pencil, MoreVertical, Plus } from "lucide-react";
import DashboardShell from "@/components/dashboard-shell";
import Card from "./card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CardSection({ title, cards, emptyMessage, onDelete, router }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-4">
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {cards.map((card, index) => (
              <div
                key={card._id ?? index}
                className="relative flex justify-center rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <Card
                  name={card.name}
                  profession={card.profession}
                  phone={card.phone}
                  quote={card.quote}
                  bgGrad={card.bgGrad}
                  bgStyle={card.bgStyle}
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
                    <DropdownMenuItem>
                      <Pencil className="size-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/payment/orders")}>
                      <ShoppingCart className="size-4" />
                      Order
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => onDelete(card._id, card.cardName)}
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
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        )}
      </div>
    </section>
  );
}

const Mycards = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favouriteCards, setFavouriteCards] = useState([]);
  const [lovedCards, setLovedCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const useremail = session?.user?.email;
    let timer;

    if (status === "unauthenticated") {
      timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);
      return;
    }

    if (!useremail) return;

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

    return () => clearTimeout(timer);
  }, [session, status]);

  const handlefavouriteDelete = async (id, cardName) => {
    try {
      const res = await fetch(`/api/deletecard/deletefavouritedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFavouriteCards((prev) => prev.filter((card) => card._id !== id));
        toast.success(`Card deleted successfully : ${cardName}`);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    }
  };

  const handlelovedDelete = async (id, cardName) => {
    try {
      const res = await fetch(`/api/deletecard/deletelovedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLovedCards((prev) => prev.filter((card) => card._id !== id));
        toast.success(`Card deleted successfully : ${cardName}`);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    }
  };

  const handlesavedDelete = async (id, cardName) => {
    try {
      const res = await fetch(`/api/deletecard/deletesavedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSavedCards((prev) => prev.filter((card) => card._id !== id));
        toast.success(`Card deleted successfully : ${cardName}`);
      } else {
        toast.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="md:pl-64">
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                My Cards
              </h1>
              <p className="mt-1 text-muted-foreground">
                Your beautiful collection for sure.
              </p>
            </div>
            <Button onClick={() => router.push("/cards/createcard")}>
              <Plus className="size-4" />
              Create Card
            </Button>
          </div>

          <CardSection
            title="Favourite Cards"
            cards={favouriteCards}
            emptyMessage="All your selected cards as Favourite will display here"
            onDelete={handlefavouriteDelete}
            router={router}
          />

          <CardSection
            title="Loved Cards"
            cards={lovedCards}
            emptyMessage="All your selected cards as Loved will display here"
            onDelete={handlelovedDelete}
            router={router}
          />

          <CardSection
            title="Created Cards"
            cards={savedCards}
            emptyMessage="All your selected cards as Created will display here"
            onDelete={handlesavedDelete}
            router={router}
          />
        </div>
      </main>
    </div>
  );
};

export default Mycards;
