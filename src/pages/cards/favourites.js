//favourite cards page
import React from "react";
import Link from "next/link";
import { Lock, Star } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { CardCollection } from "@/components/card-collection";
import { FullscreenStatus, PageHeader } from "@/components/dashboard-ui";
import { buttonVariants } from "@/components/ui/button";
import { useCardList } from "@/lib/useCardList";

const Favourites = () => {
  const { cards, loading, status, handleDelete } = useCardList({
    fetchPath: "getfavouritecard",
    listKey: "favouriteCards",
    deletePath: "deletefavouritedcard",
  });

  if (status === "unauthenticated") {
    return (
      <FullscreenStatus
        icon={Lock}
        spin={false}
        title="You are not logged in"
        message="Redirecting to the login page…"
      />
    );
  }

  return (
    <DashboardLayout title="Favourite Cards" path="/cards/favourites">
      <div className="space-y-8">
        <PageHeader title="Favourites" description="Cards you marked as favourite." />

        <CardCollection
          cards={cards}
          loading={loading}
          emptyIcon={Star}
          emptyTitle="No favourite cards yet"
          emptyMessage="Mark a card as Favourite from Create Card to see it here."
          emptyAction={
            <Link href="/cards/mycards" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              Go to My Cards
            </Link>
          }
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Favourites;
