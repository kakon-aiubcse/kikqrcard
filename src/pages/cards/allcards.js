import React, { forwardRef, useState, useEffect } from "react";
import Card from "./card";
import { useRouter } from "next/router";
import {  HandHeart, ShoppingCart } from "lucide-react";

const Allcards = forwardRef((props, ref) => {
  const router = useRouter();
  const [allcard, setAllcard] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // start with 3

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/getCards/getallcards");
        const data = await response.json();
        setAllcard(data.allcards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div
      ref={ref}
      id="cards"
      className="flex flex-col min-h-screen w-screen py-2 px-1 items-center justify-center xs:gap-2 xs:relative xs:h-full xs:mb-32"
    >
      <div className="flex items-center justify-center pr-60 xs:pr-0">
        <span className="text-6xl font-cp p-4 m-4 text-brand font-bold">
          All Cards.
        </span>
      </div>

      <div className="w-screen top-[-20px] flex flex-col relative xs:right-[108px] tb:right-16 lp:right-12 xb:right-10 tb:pr-0">
        {allcard?.length > 0 ? (
          allcard.slice(0, visibleCount).map((card, index) => (
            <div
              key={index}
              className="flex flex-col relative tb:right-52 tb:w-[1000px] lp:right-[550px] lp:w-[2000px] xb:items-center xb:right-[280px]"
            >
              <Card
                name={card.name}
                profession={card.profession}
                phone={card.phone}
                quote={card.quote}
                bgGrad={card.bgGrad}
                bgStyle={card.bgStyle}
              />
              <div
                className="absolute  w-[80px] h-[250px] hover:border hover:border-brand rounded-full  top-[35px] lp:top-[35px] left-[76%] lp:left-[81%] hover:scale-105
         xb:left-[87.5%] xb:top-[40px]   transition-transform duration-1000 ease-in-out cursor-pointer"
              >
                <div className="flex p-2 m-2 items-center justify-center h-[200px]  transition-transform duration-1000 ease-in-out">
                  <ul className="gap-3">
                    <li>
                      <span className="flex my-5  transition-transform duration-1000 ease-in-out">
                        <HandHeart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400  transition-transform duration-1000 ease-in-out "/>
                      </span>
                    </li>
                    <li>
                      <span className="flex my-5  transition-transform duration-1000 ease-in-out ">
                        <ShoppingCart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400  transition-transform duration-1000 ease-in-out" />
                      </span>
                    </li>
                  
                  </ul>
                </div>
              </div>
              <div className="absolute lp:hidden xb:hidden  w-[80px] h-[250px] hover:border hover:border-brand rounded-full  top-[355px] left-[76%]">
              <div className="flex p-2 m-2 items-center justify-center h-[200px] ">
                  <ul className="gap-3 transition-transform duration-1000 ease-in-out">
                    <li>
                      <span className="flex my-5 ">
                        <HandHeart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400 "/>
                      </span>
                    </li>
                    <li>
                      <span className="flex my-5 ">
                        <ShoppingCart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400 " />
                      </span>
                    </li>
                   
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 relative left-20">
            All public cards will display here
          </p>
        )}
      </div>

      <div className="flex mr-72 gap-5 m-3 p-3 xs:mr-4">
        {visibleCount < allcard.length && (
          <span
            onClick={handleShowMore}
            className="p-3 text-brand font-cp hover:text-sky-700 border border-brand mt-5 hover:border hover:border-sky-600 hover:scale-110 transition-transform hover:shadow-lg hover:shadow-[#8F87F1] duration-700 ease-in-out rounded-xl cursor-pointer"
          >
            show more
          </span>
        )}

        {visibleCount > 3 && (
          <span
            onClick={() => setVisibleCount(3)}
            className="p-3 text-brand font-cp hover:text-red-600 border border-brand mt-5 hover:border hover:border-red-500 hover:scale-110 transition-transform hover:shadow-lg hover:shadow-red-400 duration-700 ease-in-out rounded-xl cursor-pointer"
          >
            collapse
          </span>
        )}

        <span
          onClick={() => router.push("/cards/createcard")}
          className="p-3 text-brand font-cp hover:text-sky-700 border border-brand mt-5 hover:border hover:border-sky-600 hover:scale-110 transition-transform hover:shadow-lg hover:shadow-[#8F87F1] duration-700 ease-in-out rounded-xl cursor-pointer"
        >
          create card?
        </span>
      </div>
    </div>
  );
});

export default Allcards;
