import { forwardRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  { icon: "/social.svg", title: "Social Media Links", description: "Your all social media presence in one digital business card. Stay connected with your customers." },
  { icon: "/whatsapp.svg", title: "WhatsApp Enabled", description: "You can enable and disable WhatsApp Chat Feature in your digital business card." },
  { icon: "/gallery.svg", title: "Photo Gallery", description: "You can upload product photos or any business related photos in your gallery section." },
  { icon: "/youtube.svg", title: "YouTube Link Integration", description: "You can integrate your YouTube Link with your digital business card." },
  { icon: "/maps.svg", title: "Google Maps Integration", description: "You can display your shop / business location in google maps. Visitors can easily find you." },
  { icon: "/theme.svg", title: "Modern Theme", description: "We used modern theme for user interface. It is fully responsive." },
  { icon: "/cleanui.svg", title: "Clean UI Design", description: "We crafted all designs professionally. It's made with latest frameworks." },
  { icon: "/thunder.svg", title: "Faster Loading", description: "We give more importance to page load. Your digital card loads faster than normal webpages." },
  { icon: "/links.svg", title: "Unique Link", description: "Your name or business, whatever it is. You can generate your business card link as per your choice." },
];

const Feature = forwardRef((props, ref) => {
  return (
    <section ref={ref} id="feature" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Why our digital cards?
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            QRcard&apos;s Features
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex size-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Image src={feature.icon} alt="" width={28} height={28} className="size-7" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
});

Feature.displayName = "Feature";

export default Feature;
