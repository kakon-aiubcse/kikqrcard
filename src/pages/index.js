import React, { useRef } from "react";
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
    <>
      <div className="flex h-screen w-full overflow-hidden xs:flex xs:flex-col xs:w-screen xs:min-h-screen">
        <div className=" w-2/12 h-full  bg-violet-100 xs:flex xs:flex-row xs:w-screen xs:h-[110px] xs:pb-0">
          <section className=" w-auto items-center justify-center flex h-full xs:w-screen ">
            <Header
              sectionref={[
                homeref,
                allcardsref,
                featuresref,
                pricingref,
                contactref,
                blogref,
                
              ]}
            />
          </section>
        </div>

        <div
          className="flex flex-col w-10/12 min-h-screen overflow-x-hidden 
        xs:flex xs:items-center xs:justify-start xs:overflow-x-hidden xs:w-screen xs:overflow-y-auto "
        >
          <section className="w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 ">
            <Home id="home" ref={homeref} blogref = {blogref}/>
          </section>

          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0  xs:relative  ">
            <Allcards id="cards" ref={allcardsref}/>
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Feature id="feature" ref={featuresref}/>
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Pricing id="pricing" ref={pricingref} />
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:mb-0 xs:h-auto">
            <Contact id="contact" ref={contactref}/>
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:mb-0 xs:h-auto">
            <Blog id="blog" ref={blogref} homeref = {homeref}/>
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2  xs:h-auto">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
}