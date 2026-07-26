import { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WHY_CHOOSE = [
  { title: "Easy to Update", desc: "Edit your info anytime, instantly reflected in your card." },
  { title: "Instant Sharing", desc: "Just scan and connect, no app required." },
  { title: "Eco-Friendly", desc: "Ditch paper and go digital for a greener world." },
  { title: "Professional Design", desc: "Sleek layout tailored for business presentation." },
  { title: "Secure", desc: "You control your data and what others see." },
  { title: "Mobile Ready", desc: "Optimized for all devices and screens." },
];

const Blog = forwardRef((props, ref) => {
  const { homeref } = props;

  return (
    <section ref={ref} id="blog" className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Connecting People, One Scan at a Time
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About KIK QRcards.
          </h2>
        </div>

        <div className="flex flex-col gap-14">
          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">How KIK QRcards Works?</h3>
            <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
              <li>Create your digital card with your contact and branding.</li>
              <li>Generate and customize your unique QR code.</li>
              <li>Share the QR to let others view your profile instantly.</li>
            </ol>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">What is KIK QRcard?</h3>
            <p className="leading-relaxed text-muted-foreground">
              KIK QR Card is a digital card solution that generates a dynamic QR code linked to
              your customizable profile. Share your contact, portfolio, and business information
              instantly — no apps or paper needed.
            </p>
          </div>

          <div>
            <h3 className="mb-6 text-xl font-semibold text-foreground">Why Choose KIK QRcard?</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_CHOOSE.map((item) => (
                <Card key={item.title} className="border-border/60">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">Who Is It For?</h3>
            <p className="leading-relaxed text-muted-foreground">
              Freelancers, business professionals, students, creators, and anyone who wants to
              network smarter and faster.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">Our Mission &amp; Vision</h3>
            <p className="leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Mission:</strong> To simplify how people connect
              and share information through innovative digital tools.
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              <strong className="text-foreground">Vision:</strong> To become the go-to digital card
              platform for professionals around the world.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => homeref?.current?.scrollIntoView({ behavior: "smooth" })}
            >
              Let&apos;s Start!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

Blog.displayName = "Blog";

export default Blog;
