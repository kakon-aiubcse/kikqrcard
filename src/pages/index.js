import React from "react";
import Home from "./home";
import Header from "./elements/header";
import Allcards from "./cards/allcards";
import Tc from "./about/t&c";
import Blog from "./about/blog";
import Faq from "./about/faq";
import Footer from "./elements/footer";
import Feature from "./about/features";

export default function Index() {
  return (
    <>
      <div className=" flex  flex-col relative items-center justify screen w-screen min-h-screen text-black">
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Header />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2 h-auto">
          
          <Home />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Allcards />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Blog />
        </section>

        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Faq />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Tc />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Feature />
        </section>
        <section className=" w-screen items-center justify-center flex p-4 m-2">
          <Footer />
        </section>
      </div>
    </>
  );
}
