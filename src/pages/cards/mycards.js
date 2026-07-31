//created cards page
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LayoutGrid, Plus } from "lucide-react";
import { Seo } from "@/components/seo";
import DashboardShell from "@/components/dashboard-shell";
import { CardCollection } from "@/components/card-collection";
import { Button } from "@/components/ui/button";

const Mycards = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
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
        const res = await fetch(`/api/getCards/getsavedcard?email=${useremail}`);
        const data = await res.json();
        setSavedCards(data.savedCards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();

    return () => clearTimeout(timer);
  }, [session, status]);

  const handleDelete = async (id, cardName) => {
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
      <Seo title="Created Cards" path="/cards/mycards" noIndex />
      <DashboardShell />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                My Cards
              </h1>
              <p className="mt-1 text-muted-foreground">
                Your beautiful collection, organized in one place.
              </p>
            </div>
            <Button onClick={() => router.push("/cards/createcard")}>
              <Plus className="size-4" />
              Create Card
            </Button>
          </div>

          <CardCollection
            cards={savedCards}
            emptyIcon={LayoutGrid}
            emptyTitle="No created cards yet"
            emptyMessage="Cards you create will show up here."
            onDelete={handleDelete}
            router={router}
            editable
          />
        </div>
      </main>
    </div>
  );
};

export default Mycards;
