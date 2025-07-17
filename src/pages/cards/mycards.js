//all selected or created cards display
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Sidebar from "../dashboard/sidebar";
import { ArrowRightIcon } from "lucide-react";
import Card from "./card";

const Mycards = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favouriteCards, setFavouriteCards] = useState({});
  const [lovedCards, setLovedCards] = useState({});
  const [savedCards, setSavedCards] = useState({})

  useEffect(() => {
    const useremail = session?.user?.email;
    let timer;

    if (status === "unauthenticated") {
      timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);
      return;
    }

    if (!useremail) return;

    const fetchCards = async () => {
      try {
        const [favouriteRes, lovedRes, savedRes] = await Promise.all([
          fetch(`/api/getCards/getfavouritecard?email=${useremail}`),
          fetch(`/api/getCards/getlovedcard?email=${useremail}`),
          fetch(`/api/getCards/getsavedcard?email=${useremail}`),
        ]);

        const favouriteData = await favouriteRes.json();
        const lovedData = await lovedRes.json();
        const savedcardData = await savedRes.json();

        setFavouriteCards(favouriteData.favouriteCards || []);
        setLovedCards(lovedData.lovedCards || []);
        setSavedCards(savedcardData.savedCards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();

    return () => clearTimeout(timer);
  }, [session, status]);

  return (
    <>
      <div className="flex ml-[8%] xs:ml-[0%]  overflow-hidden xs:overflow-x-hidden ">
        <Sidebar />
        <div className="ml-[8%] xs:ml-0 xs:relative xs:top-[110px] min-h-screen">
          <div className="flex flex-col items-center justify-center relative tb:right-8  lp:right-16 xb:right-28">
            <span className="text-base font-ios text-slate-500 p-4 mx-2">
              Your beautiful collection for sure.
            </span>
            <span className="text-5xl font-cp font-bold text-brand p-2 mx-4">
              My Cards
            </span>
          </div>
          <span className="text-brand mx-2 mt-3 flex ml-8 xb:ml-12 xb:text-xl">No cards yet?</span>
          <div
            className="bg-white border-2 border-black flex justify-center items-center mx-8 mt-5 
          hover:border-brand rounded-full shadow-[#8F87F1] shadow-xl hover:shadow-[#7063ff] tb:w-[70%] lp:w-[70%] xb:w-[70%]"
            onClick={() => {
              router.push("/cards/createcard");
            }}
          >
            <button className=" flex text items-center justify-center gap-10 text-2xl text-slate-800 p-2 m-1 font-cp hover:text-sky-300 hover:underline">
              Create Card
              <ArrowRightIcon className="w-10 h-14 hover:text-red-300" />
            </button>
          </div>
          <div
            className="text-3xl xs:text-2xl xs:m-4 xs:mt-6 font-cp font-bold relative tb:right-8  lp:right-16 xb:right-28
         text-brand p-2 mx-12 my-10 justify-center items-center flex "
          >
            Favourite Cards
          </div>
          <div className="w-screen top-[-20px] flex flex-col relative xs:right-[108px] tb:pr-0">
            {favouriteCards.length > 0 ? (
              favouriteCards.map((favouriteCard, index) => (
                <div
                  key={index}
                  className="flex flex-col relative tb:right-52 tb:w-[1000px]  lp:right-[550px] lp:w-[2000px] xb:items-center xb:right-[280px] "
                >
                  <Card
                    name={favouriteCard.name}
                    profession={favouriteCard.profession}
                    phone={favouriteCard.phone}
                    quote={favouriteCard.quote}
                    bgGrad={favouriteCard.bgGrad}
                    bgStyle={favouriteCard.bgStyle}
                  />
                  {/* <div className="w-[300px] h-30 flex relative ml-[20%]  m-4">
                  hllw
                </div> */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                All your selected cards as Favourite will display here
              </p>
            )}
          </div>

          <div className="text-3xl xs:text-2xl xs:m-4 xs:mt-6 font-cp font-bold text-brand p-2 m-12 justify-center items-center flex relative tb:right-8  lp:right-16 xb:right-28">
            Loved Cards
          </div>
          <div className="w-screen top-[-20px] flex flex-col relative xs:right-[108px] tb:pr-0">
            {lovedCards.length > 0 ? (
              lovedCards.map((lovedcard, index) => (
                <div
                  key={index}
                  className="flex flex-col relative tb:right-52 tb:w-[1000px]  lp:right-[550px] lp:w-[2000px] xb:items-center xb:right-[280px]"
                >
                  <Card
                    name={lovedcard.name}
                    profession={lovedcard.profession}
                    phone={lovedcard.phone}
                    quote={lovedcard.quote}
                    bgGrad={lovedcard.bgGrad}
                    bgStyle={lovedcard.bgStyle}
                  />
                  {/* <div className="w-[300px] h-30 flex relative ml-[20%]  m-4">
                  hllw
                </div> */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                All your selected cards as Loved will display here
              </p>
            )}
          </div>

          <div className="text-3xl xs:text-2xl xs:m-4 xs:mt-6 font-cp font-bold text-brand p-2 m-12 justify-center items-center flex relative tb:right-8 l lp:right-16 xb:right-28">
            Created cards
          </div>
          <div className="w-screen top-[-20px] flex flex-col relative xs:right-[108px] tb:pr-0">
            {savedCards.length > 0 ? (
              savedCards.map((savedcard, index) => (
                <div
                  key={index}
                  className="flex flex-col relative tb:right-52 tb:w-[1000px]  lp:right-[550px] lp:w-[2000px] xb:items-center xb:right-[280px]"
                >
                  <Card
                    name={savedcard.name}
                    profession={savedcard.profession}
                    phone={savedcard.phone}
                    quote={savedcard.quote}
                    bgGrad={savedcard.bgGrad}
                    bgStyle={savedcard.bgStyle}
                  />
                  {/* <div className="w-[300px] h-30 flex relative ml-[20%]  m-4">
                  hllw
                </div> */}
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                All your selected cards as Loved will display here
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mycards;
