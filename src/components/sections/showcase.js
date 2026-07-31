import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import axios from "axios";
import BusinessCard from "@/components/business-card";
import { Button } from "@/components/ui/button";

const Showcase = forwardRef((props, ref) => {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/cardtemplates/public");
        setTemplates((data.templates || []).slice(0, 8));
      } catch {
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section ref={ref} id="cards" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Card Designs.
          </h2>
          <p className="mt-3 text-muted-foreground">
            A few examples of what you can create.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {templates.map((t) => (
              <div
                key={t._id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-lg"
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
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-foreground">
                    ৳{Number(t.price).toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/cards/createcard")}
                  >
                    Order now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link href="/cards/allcards">
            <Button variant="outline">View all designs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

Showcase.displayName = "Showcase";

export default Showcase;
