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
    cadence: "/30 days",
    description: "This is a free way to discover our digital cards.",
    featured: false,
    features: [
      { label: "1 virtual card", included: true },
      { label: "3 Social link", included: true },
      { label: "1 Product", included: false },
      { label: "1 gallery photo", included: true },
      { label: "Daily Maintenance", included: false },
      { label: "1 Premium card", included: false },
      { label: "1 Google Map link", included: true },
      { label: "Whatsapp enabled", included: false },
      { label: "Free Set up", included: false },
      { label: "Free Support", included: false },
    ],
    actions: [{ label: "Sign up", href: "/authentication/signup", variant: "default" }],
  },
  {
    name: "Personal",
    price: "$10",
    cadence: "Forever",
    description: "Designed to meet every individual's QR card needs.",
    featured: true,
    features: [
      { label: "1 virtual card", included: true },
      { label: "5 Social link", included: true },
      { label: "2 Product", included: true },
      { label: "5 gallery photo", included: true },
      { label: "Daily Maintenance", included: false },
      { label: "1 Premium card", included: true },
      { label: "3 Google Map link", included: true },
      { label: "Whatsapp enabled", included: true },
      { label: "Free Set up", included: true },
      { label: "Free Support", included: false },
    ],
    actions: [
      { label: "Purchase", href: "/payment/billings", variant: "default" },
      { label: "Sign up", href: "/authentication/signup", variant: "outline" },
    ],
  },
  {
    name: "Business",
    price: "$110",
    cadence: "/6 months",
    description: "Implemented to meet company's QR card needs.",
    featured: false,
    features: [
      { label: "10 virtual card", included: true },
      { label: "5 Social link", included: true },
      { label: "5 Product", included: true },
      { label: "10 gallery photo", included: true },
      { label: "Daily Maintenance", included: true },
      { label: "10 Premium card", included: true },
      { label: "5 Google Map link", included: true },
      { label: "Whatsapp enabled", included: true },
      { label: "Free Set up", included: true },
      { label: "Free Support", included: true },
    ],
    actions: [
      { label: "Purchase", href: "/payment/billings", variant: "default" },
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
            Smart investing. 10&times; returns.
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
