//all selected or created cards display
import React from "react";
import { useRouter } from "next/router";

import Sidebar from "../dashboard/sidebar";
import { ArrowRightIcon } from "lucide-react";

const Mycards = () => {
  const router = useRouter();
  return (
    <>
      <Sidebar />
      <div className="ml-[16.666667%] xs:ml-0 xs:relative xs:top-[110px] min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <span className="text-base font-ios text-slate-500 p-4 mx-2">
            Your beautiful collection for sure.
          </span>
          <span className="text-5xl font-cp font-bold text-brand p-2 mx-4">
            My Cards
          </span>
        </div>

        <div className="bg-white border-4 border-black flex justify-center items-center mx-4 mt-5  rounded-full shadow-[#8F87F1] shadow-2xl hover:shadow-[#7063ff]"
        onClick={()=>{router.push("/cards/createcard")}}>
          <button className=" flex text items-center justify-center gap-10 text-3xl text-slate-800 p-4 m-4 font-cp hover:text-sky-300 hover:underline">
            Create Cards?
            <ArrowRightIcon className="w-10 h-14 hover:text-red-300" />
          </button>
        </div>
        <div className="text-5xl xs:text-3xl xs:m-4 xs:mt-9 font-cp font-bold text-brand p-2 m-16 justify-center items-center flex ">
          Favourite cards
        </div>
        <div className="flex items-center justify-center">
          all your selected cards as Favourite will display here
        </div>
        <div className="text-5xl xs:text-3xl xs:m-4 xs:mt-9 font-cp font-bold text-brand p-2 m-16 justify-center items-center flex ">
        liked cards
        </div>
        <div className="flex items-center justify-center">
          all your liked cards as love will display here
        </div>
         <div className="text-5xl xs:text-3xl xs:m-4 xs:mt-9 font-cp font-bold text-brand p-2 m-16 justify-center items-center flex ">
          Ordered Cards
        </div>
        <div className="flex items-center justify-center">
          all your ordered cards cards as love will display here
        </div>
          <div className="text-5xl xs:text-3xl xs:m-4 xs:mt-9 font-cp font-bold text-brand p-2 m-16 justify-center items-center flex ">
          Created cards
        </div>
        <div className="flex items-center justify-center">
          created cards will display here
        </div>
      </div>
    </>
  );
};

export default Mycards;
