import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Seo } from "@/components/seo";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BusinessCard from "@/components/business-card";
import { Button } from "@/components/ui/button";

function AllCards() {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/cardtemplates/public");
        setTemplates(data.templates || []);
      } catch {
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Seo
        title="All Card Designs"
        description="Browse every KIK QRcard design, from premium to starter, and pick the one that fits you."
        path="/cards/allcards"
      />
      <SiteHeader sectionref={[]} />
      <main className="flex-1 py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              All Card Designs
            </h1>
            <p className="mt-3 text-muted-foreground">
              From premium to starter — find the design that fits your style and budget.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="size-6 animate-spin text-primary" />
            </div>
          ) : templates.length === 0 ? (
            <p className="text-center text-muted-foreground">No designs available yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {templates.map((t) => (
                <div
                  key={t._id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <BusinessCard
                    name={t.name}
                    profession={t.profession}
                    phone={t.phone}
                    quote={t.quote}
                    bgGrad={t.bgGrad}
                    bgStyle={t.bgStyle}
                    pattern={t.pattern}
                  />

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-xl font-bold text-foreground">
                        ৳{Number(t.price).toLocaleString()}
                      </p>
                    </div>

                    <div className="relative h-9 w-32">
                      <span className="absolute inset-0 flex items-center justify-end text-sm font-medium text-muted-foreground transition-opacity duration-150 group-hover:opacity-0">
                        {t.name}
                      </span>
                      <Button
                        size="sm"
                        className="absolute inset-0 w-full opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        onClick={() => router.push("/payment/orders")}
                      >
                        Order now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default AllCards;
