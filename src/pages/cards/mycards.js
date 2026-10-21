//created cards page
import React from "react";
import Link from "next/link";
import { Lock, Plus, WalletCards } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-shell";
import { CardCollection } from "@/components/card-collection";
import { FullscreenStatus, PageHeader } from "@/components/dashboard-ui";
import { buttonVariants } from "@/components/ui/button";
import { useCardList } from "@/lib/useCardList";

const Mycards = () => {
  const { cards, loading, status, handleDelete } = useCardList({
    fetchPath: "getsavedcard",
    listKey: "savedCards",
    deletePath: "deletesavedcard",
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
    <DashboardLayout title="Created Cards" path="/cards/mycards">
      <div className="space-y-8">
        <PageHeader
          title="My cards"
          description="Your beautiful collection, organized in one place."
          actions={
            <Link href="/cards/createcard" className={buttonVariants({ size: "lg" })}>
              <Plus className="size-4" />
              New card
            </Link>
          }
        />

        <CardCollection
          cards={cards}
          loading={loading}
          emptyIcon={WalletCards}
          emptyTitle="No cards yet"
          emptyMessage="Cards you create will show up here."
          emptyAction={
            <Link href="/cards/createcard" className={buttonVariants({ size: "lg" })}>
              <Plus className="size-4" />
              Create your first card
            </Link>
          }
          onDelete={handleDelete}
          editHref={(card) => `/cards/createcard?id=${card._id}`}
        />
      </div>
    </DashboardLayout>
  );
};

export default Mycards;
