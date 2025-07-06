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
      <div className="flex h-screen w-full overflow-hidden xs:flex xs:flex-col xs:w-screen">
        <div className=" w-2/12 h-full  bg-violet-100 xs:flex xs:flex-row xs:w-screen xs:h-[100px] xs:pb-0">
          <section className=" w-auto items-center justify-center flex h-full xs:w-screen ">
            <Header />
          </section>
        </div>

        <div className="flex flex-col w-10/12 h-full overflow-y-auto xs:flex xs:items-center xs:justify-start xs:overflow-hidden xs:w-screen">
          <section className="w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Home />
          </section>

          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto ">
            <Allcards />
          </section>
            <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Blog />
          </section>

          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Faq />
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Tc />
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Feature />
          </section>
          <section className=" w-screen items-center justify-center flex p-4 m-2 xs:p-2 xs:m-0 xs:h-auto">
            <Footer />
          </section> 
        </div>
      </div>
    </>
  );
}
