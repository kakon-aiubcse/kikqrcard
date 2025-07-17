import React, { forwardRef, useState, useEffect } from "react";
import Card from "./card";
import { useRouter } from "next/router";

const Allcards = forwardRef((props, ref) => {
  const router = useRouter();
  const [allcard, setAllcard] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("/api/getCards/getallcards");
        const data = await response.json();
        setAllcard(data.savedCards || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };

    fetchCards();
  }, []);

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
          allcard.map((card, index) => (
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
            </div>
          ))
        ) : (
          <p className="text-gray-500">All public cards will display here</p>
        )}
      </div>

      <div className="flex mr-72 gap-5 m-3 p-3 xs:mr-4">
        <span className="p-3 text-brand font-cp hover:text-sky-700 border border-brand mt-5 hover:border hover:border-sky-600 hover:scale-110 transition-transform hover:shadow-lg hover:shadow-[#8F87F1] duration-700 ease-in-out rounded-xl">
          show more
        </span>
        <span
          onClick={() => router.push("/cards/createcard")}
          className="p-3 text-brand font-cp hover:text-sky-700 border border-brand mt-5 hover:border hover:border-sky-600 hover:scale-110 transition-transform hover:shadow-lg hover:shadow-[#8F87F1] duration-700 ease-in-out rounded-xl"
        >
          create card?
        </span>
      </div>
    </div>
  );
});

export default Allcards;
