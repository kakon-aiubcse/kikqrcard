//loved cards page
import React from "react";
import Link from "next/link";
import { Heart, Lock } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { CardCollection } from "@/components/card-collection";
import { FullscreenStatus, PageHeader } from "@/components/dashboard-ui";
import { buttonVariants } from "@/components/ui/button";
import { useCardList } from "@/lib/useCardList";

const Loved = () => {
  const { cards, loading, status, handleDelete } = useCardList({
    fetchPath: "getlovedcard",
    listKey: "lovedCards",
    deletePath: "deletelovedcard",
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
    <DashboardLayout title="Loved Cards" path="/cards/loved">
      <div className="space-y-8">
        <PageHeader title="Loved" description="Cards you marked as loved." />

        <CardCollection
          cards={cards}
          loading={loading}
          emptyIcon={Heart}
          emptyTitle="No loved cards yet"
          emptyMessage="Mark a card as Loved from Create Card to see it here."
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

export default Loved;
