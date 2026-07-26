import { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { HandHeart, Share2, Copy, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BusinessCard from "@/components/business-card";
import { Button } from "@/components/ui/button";

const Allcards = forwardRef((props, ref) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [allcard, setAllcard] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const requireLogin = () => {
    if (session?.user?.email) return true;
    toast.error("Please log in to do that");
    router.push("/authentication/login");
    return false;
  };

  const handleLove = async (card) => {
    if (!requireLogin()) return;
    try {
      const res = await fetch("/api/cards/lovedCards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          cardName: card.cardName,
          name: card.name,
          profession: card.profession,
          phone: card.phone,
          quote: card.quote,
          bgGrad: card.bgGrad,
          bgStyle: card.bgStyle,
          pattern: card.pattern,
          isloved: true,
        }),
      });
      if (res.ok) {
        toast.success("Added to loved cards");
      } else if (res.status === 409) {
        toast.error("Already in your loved cards");
      } else {
        toast.error("Failed to love card");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  const handleShare = async (card) => {
    const url = `${window.location.origin}/#cards-${encodeURIComponent(card.cardName)}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleCopyDesign = async (card) => {
    if (!requireLogin()) return;
    try {
      const res = await fetch("/api/cards/saveCards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          cardName: `${card.cardName}-copy`,
          name: card.name,
          profession: card.profession,
          phone: card.phone,
          quote: card.quote,
          bgGrad: card.bgGrad,
          bgStyle: card.bgStyle,
          pattern: card.pattern,
          savedCard: true,
        }),
      });
      if (res.ok) {
        toast.success("Design copied to your cards");
      } else if (res.status === 409) {
        toast.error("You already copied this design");
      } else {
        toast.error("Failed to copy design");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/getCards/getallcards");
        const data = await response.json();
        setAllcard(data.allcards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();
  }, []);

  const totalPages = Math.max(1, Math.ceil(allcard.length / pageSize));
  const pagedCards = allcard.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (nextPage) => {
    setPage(nextPage);
    document.getElementById("cards")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={ref} id="cards" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            All Cards.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Browse cards created by the community.
          </p>
        </div>

        {allcard?.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {pagedCards.map((card, index) => (
              <div
                key={`${page}-${index}`}
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <BusinessCard
                  name={card.name}
                  profession={card.profession}
                  phone={card.phone}
                  quote={card.quote}
                  email={card.contactEmail}
                  website={card.website}
                  address={card.address}
                  bgGrad={card.bgGrad}
                  bgStyle={card.bgStyle}
                  pattern={card.pattern}
                />
                <div className="grid max-h-0 w-full grid-rows-[0fr] justify-items-center opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-16 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                  <div className="flex min-h-0 items-center justify-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleLove(card)}>
                      <HandHeart className="size-4" />
                      Love
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleShare(card)}>
                      <Share2 className="size-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCopyDesign(card)}>
                      <Copy className="size-4" />
                      Copy design
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            All public cards will display here.
          </p>
        )}

        {allcard.length > pageSize && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => goToPage(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => router.push("/cards/createcard")}>
            <Plus className="size-4" />
            Create card
          </Button>
        </div>
      </div>
    </section>
  );
});

Allcards.displayName = "Allcards";

export default Allcards;
