import { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HandHeart, ShoppingCart, MoreVertical, Plus } from "lucide-react";
import BusinessCard from "@/components/business-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Allcards = forwardRef((props, ref) => {
  const router = useRouter();
  const [allcard, setAllcard] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

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

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
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
            {allcard.slice(0, visibleCount).map((card, index) => (
              <div
                key={index}
                className="relative flex justify-center rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <BusinessCard
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
                      <HandHeart className="size-4" />
                      Like
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/payment/orders")}>
                      <ShoppingCart className="size-4" />
                      Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            All public cards will display here.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {visibleCount < allcard.length && (
            <Button variant="outline" onClick={handleShowMore}>
              Show more
            </Button>
          )}
          {visibleCount > 3 && (
            <Button variant="outline" onClick={() => setVisibleCount(3)}>
              Collapse
            </Button>
          )}
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
