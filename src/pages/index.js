import { useRef } from "react";
import { Seo } from "@/components/seo";
import Home from "@/components/sections/home";
import SiteHeader from "@/components/site-header";
import Allcards from "@/components/sections/allcards";
import Blog from "@/components/sections/blog";
import SiteFooter from "@/components/site-footer";
import Feature from "@/components/sections/features";
import Pricing from "@/components/sections/pricing";
import Contact from "@/components/sections/contact";

export default function index() {
  const homeref = useRef(null);
  const allcardsref = useRef(null);
  const featuresref = useRef(null);
  const pricingref = useRef(null);
  const contactref = useRef(null);
  const blogref = useRef(null);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Seo
        title="Digital QR Business Cards"
        description="Grow your network with KIK QRcard's digital QR-based business cards. Share your contact, portfolio, and business info instantly — no apps or paper needed."
        path="/"
      />
      <SiteHeader
        sectionref={[homeref, allcardsref, featuresref, pricingref, contactref, blogref]}
      />
      <main className="flex flex-1 flex-col">
        <Home id="home" ref={homeref} blogref={blogref} />
        <Allcards id="cards" ref={allcardsref} />
        <Feature id="feature" ref={featuresref} />
        <Pricing id="pricing" ref={pricingref} />
        <Contact id="contact" ref={contactref} />
        <Blog id="blog" ref={blogref} homeref={homeref} />
      </main>
      <SiteFooter />
    </div>
  );
}
