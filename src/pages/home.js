//this is homepage import React, { useState } from "react";
import React,{ forwardRef } from "react";
import { useRouter } from "next/router";

const Home = forwardRef((props, ref) => {
  const router = useRouter();
  const { blogref } = props; 
  
  return (
    <>
    <div ref={ref}
      id="home" 
    className="w-screen flex flex-row  min-h-screen overflow-y-hidden xs:flex xs:flex-col xs:overflow-x-hidden xs:w-screen xs:min-h-screen">
      <div className="flex flex-col items-start justify-center w-2/3 xs:w-screen xs:order-2 xs:min-h-screen xs:relative xs:bottom-12">
        <span className="text-7xl font-cp p-5 font-semibold m-20 lp:text-5xl lp:p-3 lp:m-12 xs:text-5xl xs:p-1 xs:m-2 ">
          Your Network <br />
          is Your <span className="text-violet-500  ">Net Worth.</span>
        </span>
        <span className="text-3xl font-ios px-5 mx-20 font-medium lp:text-base lp:p-3 lp:mx-12 xs:text-sm xs:pt-10 xs:p-1 xs:mx-2">
          Grow your network with our digital QR-based connecting cards <br />
          —designed to make every introduction <br />
          seamless and smart.
        </span>
        <div className="flex flex-row  items-start justify-center w-auto top-10 relative px-5 mx-16 lp:px-2 lp:mx-10 xs:px-1 xs:mx-2 xs:flex xs:flex-col">
          <button
            className="flex  bg-sky-900 text-white rounded-lg w-[240px] h-[65px] m-4 p-2 font-ios text-xl font-semibold items-center justify-center
      lp:m-3 lp:p-1 "
      onClick={() => {
              blogref?.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            How it works?
          </button>
          <button
            className="flex  bg-black text-white rounded-lg w-[240px] h-[65px] m-4 p-2 font-ios text-xl font-semibold items-center justify-center
       lp:m-3 lp:p-1"
       onClick={()=>{router.push("/authentication/signup")}}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="flex items-center w-2/3 xs:flex xs:order-1 xs:relative xs:top-24  xs:ml-48">
        <img src="/intro.jpg" className="xs:bg-transparent xs:w-[350px] xs:h-[200px]" />
      </div>
    </div></>
  );
});

export default Home;
