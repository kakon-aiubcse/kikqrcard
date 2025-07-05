import React from "react";
import Home from "./home";
import Header from "./elements/header";
import Allcards from "./cards/allcards";
import Tc from "./about/t&c";
import Blog from "./about/blog";
import Faq from "./about/faq";
import Footer from "./elements/footer";
import Feature from "./about/features";

export default function index() {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden xs:flex xs:flex-col">
        <div className=" w-1/12 h-full pb-2 xs:flex xs:flex-row xs:w-screen xs:h-auto">
          <section className=" w-auto items-center justify-center flex ">
            <Header />
          </section>
        </div>

        <div className="flex flex-col w-11/12 h-full overflow-y-auto  xs:flex xs:overflow-x-auto">
          <section className="flex items-center justify-center ">
            <Home />
          </section>

          <section className=" w-screen items-center justify-center flex p-4 m-2 ">
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
      </div>
    </>
  );
}
