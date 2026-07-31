//favourite cards page
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Seo } from "@/components/seo";
import DashboardShell from "@/components/dashboard-shell";
import { CardCollection } from "@/components/card-collection";

const Favourites = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favouriteCards, setFavouriteCards] = useState([]);

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
        const res = await fetch(`/api/getCards/getfavouritecard?email=${useremail}`);
        const data = await res.json();
        setFavouriteCards(data.favouriteCards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();

    return () => clearTimeout(timer);
  }, [session, status]);

  const handleDelete = async (id, cardName) => {
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

  return (
    <div className="md:pl-64">
      <Seo title="Favourite Cards" path="/cards/favourites" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Favourite Cards
            </h1>
            <p className="mt-1 text-muted-foreground">
              Cards you marked as favourite.
            </p>
          </div>

          <CardCollection
            cards={favouriteCards}
            emptyIcon={Star}
            emptyTitle="No favourite cards yet"
            emptyMessage="Mark a card as Favourite from Create Card to see it here."
            onDelete={handleDelete}
            router={router}
          />
        </div>
      </main>
    </div>
  );
};

export default Favourites;
