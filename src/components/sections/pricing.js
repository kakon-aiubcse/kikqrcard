import { forwardRef } from "react";
import { useRouter } from "next/router";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Discover",
    price: "Free",
    cadence: "1 card",
    description: "Try a digital QR card with no cost, no time limit.",
    featured: false,
    features: [
      { label: "1 virtual card", included: true },
      { label: "3 Social links", included: true },
      { label: "0 Products", included: false },
      { label: "1 gallery photo", included: true },
      { label: "Basic QR config", included: true },
      { label: "1 Premium card design", included: false },
      { label: "1 Google Map link", included: true },
      { label: "Whatsapp enabled", included: false },
      { label: "Guided setup", included: false },
      { label: "Priority support", included: false },
    ],
    actions: [{ label: "Sign up", href: "/authentication/signup", variant: "default" }],
  },
  {
    name: "Personal",
    price: "$19",
    cadence: "one-time / card",
    description: "One card, fully configured, yours to keep forever.",
    featured: true,
    features: [
      { label: "1 virtual card", included: true },
      { label: "5 Social links", included: true },
      { label: "2 Products", included: true },
      { label: "5 gallery photos", included: true },
      { label: "Custom QR config", included: true },
      { label: "1 Premium card design", included: true },
      { label: "3 Google Map links", included: true },
      { label: "Whatsapp enabled", included: true },
      { label: "Guided setup", included: true },
      { label: "Priority support", included: false },
    ],
    actions: [
      { label: "Purchase", href: "/payment/billings?plan=personal", variant: "default" },
      { label: "Sign up", href: "/authentication/signup", variant: "outline" },
    ],
  },
  {
    name: "Business",
    price: "$149",
    cadence: "one-time / 10 cards",
    description: "Bulk cards for teams, each with its own QR config.",
    featured: false,
    features: [
      { label: "10 virtual cards", included: true },
      { label: "5 Social links / card", included: true },
      { label: "5 Products / card", included: true },
      { label: "10 gallery photos / card", included: true },
      { label: "Custom QR config / card", included: true },
      { label: "10 Premium card designs", included: true },
      { label: "5 Google Map links / card", included: true },
      { label: "Whatsapp enabled", included: true },
      { label: "Guided setup", included: true },
      { label: "Priority support", included: true },
    ],
    actions: [
      { label: "Purchase", href: "/payment/billings?plan=business", variant: "default" },
      { label: "Sign up", href: "/authentication/signup", variant: "outline" },
    ],
  },
];

function PricingCard({ tier }) {
  const router = useRouter();

  return (
    <div className={cn("relative", tier.featured && "pt-3")}>
      {tier.featured && (
        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Most popular
        </Badge>
      )}
      <Card
        className={cn(
          "relative flex flex-col border-border/60 transition-all duration-300 hover:-translate-y-1",
          tier.featured && "border-primary shadow-lg ring-1 ring-primary/30",
        )}
      >
        <CardHeader className="gap-3">
          <Badge variant="secondary" className="w-fit">
            KIK QRcard
          </Badge>
          <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">{tier.price}</span>
            <span className="text-sm text-muted-foreground">{tier.cadence}</span>
          </div>
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-6">
          <ul className="flex flex-col gap-2.5">
            {tier.features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-2.5 text-sm">
                {feature.included ? (
                  <Check className="size-4 shrink-0 text-primary" />
                ) : (
                  <X className="size-4 shrink-0 text-muted-foreground/50" />
                )}
                <span className={cn(!feature.included && "text-muted-foreground/60")}>
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-2">
            {tier.actions.map((action) => (
              <Button
                key={action.label}
                variant={action.variant}
                onClick={() => router.push(action.href)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const Pricing = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="pricing" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Simple, one-time pricing
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explore Our QRcard Plans and Choose Yours
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TIERS.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

export default Pricing;
