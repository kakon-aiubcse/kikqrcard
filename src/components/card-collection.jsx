import { Trash, ShoppingCart, Pencil, MoreVertical } from "lucide-react";
import Card from "@/pages/cards/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function CardCollection({
  cards,
  emptyIcon: EmptyIcon,
  emptyTitle,
  emptyMessage,
  onDelete,
  router,
  editable,
}) {
  if (!cards.length) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 py-16 text-center">
        {EmptyIcon && (
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <EmptyIcon className="size-6" />
          </div>
        )}
        <div>
          <p className="font-medium text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {cards.map((card, index) => (
        <div
          key={card._id ?? index}
          className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="truncate text-sm font-medium text-foreground">
              {card.name}
              {card.profession ? (
                <span className="font-normal text-muted-foreground"> · {card.profession}</span>
              ) : null}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-full" />}
              >
                <MoreVertical className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {editable && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/cards/createcard?id=${card._id}`)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </DropdownMenuItem>
                )}
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
          <Card
            name={card.name}
            profession={card.profession}
            phone={card.phone}
            quote={card.quote}
            bgGrad={card.bgGrad}
            bgStyle={card.bgStyle}
            pattern={card.pattern}
          />
        </div>
      ))}
    </div>
  );
}

export default CardCollection;
