import { useRef } from "react";
import Home from "./home";
import Header from "./elements/header";
import Allcards from "./cards/allcards";
import Blog from "./about/blog";
import Footer from "./elements/footer";
import Feature from "./about/features";
import Pricing from "./payment/pricing";
import Contact from "./about/contact";

export default function index() {
  const homeref = useRef(null);
  const allcardsref = useRef(null);
  const featuresref = useRef(null);
  const pricingref = useRef(null);
  const contactref = useRef(null);
  const blogref = useRef(null);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header
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
      <Footer />
    </div>
  );
}
