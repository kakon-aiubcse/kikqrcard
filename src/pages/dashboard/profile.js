//user dashboard/profile
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Card from "../cards/card";
import { Trash, ShoppingCart, Pencil } from "lucide-react";
import { useRouter } from "next/router";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState({
    cardName: "",
    name: "",
    email: "",
    phone: "",
    profileImageBase64: "",
  });
  const [highlightedCards, setHighlightedCards] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const useremail = session?.user?.email;
    if (!useremail) return;

    const fetchUserAndHighlighted = async () => {
      try {
        // Fetch user data
        const res = await fetch("/api/userdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: useremail }),
        });

        const data = await res.json();
        if (res.ok) {
          setUserData({
            cardName: data.cardName,
            name: data.name,
            email: data.email,
            phone: data.phone,
            profileImageBase64: data.profileImageBase64,
          });
        } else {
          console.error("Error fetching user:", data.error);
        }

        // Fetch highlighted cards
        const highlightRes = await fetch(
          `/api/getCards/gethighlightedcard?email=${useremail}`
        );
        const highlightData = await highlightRes.json();
        setHighlightedCards(highlightData.highlightedCards || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchUserAndHighlighted();
  }, [session]);

  const handlehighlightedcardDelete = async (id) => {
    try {
      const res = await fetch(`/api/deletecard/deletehighlightedcard/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setHighlightedCards((prev) => prev.filter((card) => card._id !== id));
        setMessage("Card deleted successfully");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to delete card");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("An error occurred");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <main className="ml-[16.666667%] w-10/12 h-auto lp:ml-[20%] xb:ml-[25%] xs:w-full overflow-hidden  p-4 xs:mt-[24%] xs:ml-0 xs:p-0 ">
        <div className="flex flex-col w-auto  items-start justify-start xs:w-full xs:p-4">
          <div className="flex  items-center w-full p-6 h-auto justify-start">
            <span className="text-2xl m-1 p-1 font-cp font-bold text-brand xs:text-xl tb:text-3xl lp:text-5xl xb:text-6xl">
              {userData.name}
            </span>{" "}
            <span className="text-2xl p-1 xs:text-xl font-cp tb:text-3xl lp:text-5xl xb:text-6xl">
              Dashboard
            </span>
          </div>
          <div className="flex flex-col items-start w-full  px-6 bg-white  space-y-6">
            <h2 className="text-2xl p-2 font-semibold underline text-gray-700">
              Personal Details
            </h2>
            <img
              src={`${userData.profileImageBase64}` || "/usericon.png"}
              alt="user"
              className="w-44 h-48 ml-8 rounded-full border border-brand shadow-xl"
            />
            <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
              <span className=" font-cp font-bold text-brand text-xl">
                Name:
              </span>{" "}
              {userData.name}
            </p>
            <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
              <span className=" font-cp font-bold text-brand text-xl">
                Email:
              </span>{" "}
              {userData.email}
            </p>
            <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
              <span className=" font-cp font-bold text-brand text-xl ">
                Phone Number:
              </span>{" "}
              {userData.phone}
            </p>
          </div>
        </div>
      </main>
      <div className="ml-[16.666667%] flex flex-col w-full xs:ml-0 relative p-4 tb:ml-[20%] lp:ml-[20%] xb:ml-[25%] h-auto items-start  overflow-hidden justify-start">
        <span className="text-2xl ml-6 font-cp font-semibold underline">
          Activity
        </span>
        <div className="flex flex-col items-center justify-center p-4 lp:p-8 lp:m-8 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-white rounded-2xl shadow-2xl border border-black">
          <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-950 ">
            Liked Cards
          </p>{" "}
          <span className="text-5xl text-teal-600 font-[1000] font-cp ">
            18
          </span>
        </div>
        <div className="flex flex-col items-center justify-center lp:p-8 lp:m-8 p-4 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-brand rounded-2xl shadow-2xl border border-black">
          <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-200 ">
            Profile Views
          </p>{" "}
          <span className="text-5xl text-yellow-300 font-[1000] font-cp ">
            35
          </span>
        </div>{" "}
        <div className="flex flex-col items-center justify-center lp:p-8 lp:m-8 p-4 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-black rounded-2xl shadow-2xl border border-brand">
          <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-200 ">
            Total Orders
          </p>{" "}
          <span className="text-5xl text-red-400 font-[1000] font-cp ">3</span>
        </div>
      </div>

      <div className=" ml-[16.666667%] lp:ml-[20%] xs:ml-0 flex flex-col w-full xb:ml-[25%] relative p-4 h-auto items-start overflow-hidden justify-start">
        <span className="text-2xl ml-6 font-cp font-semibold underline">
          Highlighted Card
        </span>

        <div className="w-screen top-[20px] flex flex-col relative xs:right-[122px] tb:right-16 lp:right-40 xb:right-52 tb:pr-0">
          {message && (
            <p className="text-green-600 text-sm mt-2 relative left-48">
              {message}
              {FormData.cardName}
            </p>
          )}
          {highlightedCards?.length > 0 ? (
            highlightedCards.map((highlightedCard, index) => (
              <div
                key={index}
                className="flex flex-col relative tb:right-52 tb:w-[1000px] lp:right-[550px] lp:w-[2000px] xb:items-center xb:right-[280px]"
              >
                <Card
                  name={highlightedCard.name}
                  profession={highlightedCard.profession}
                  phone={highlightedCard.phone}
                  quote={highlightedCard.quote}
                  bgGrad={highlightedCard.bgGrad}
                  bgStyle={highlightedCard.bgStyle}
                />
                <div
                  className="absolute  w-[80px] h-[250px] hover:border hover:border-brand rounded-full  top-[35px] lp:top-[35px] left-[76%] lp:left-[81%] hover:scale-105
         xb:left-[87.5%] xb:top-[40px]   transition-transform duration-1000 ease-in-out cursor-pointer"
                >
                  <div className="flex p-2 m-2 items-center justify-center h-[200px]  transition-transform duration-1000 ease-in-out">
                    <ul className="gap-3">
                      <li>
                        <span className="flex my-5  transition-transform duration-1000 ease-in-out">
                          <Pencil className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400  transition-transform duration-1000 ease-in-out " />
                        </span>
                      </li>
                      <li onClick={() => router.push("../payment/orders")}>
                        <span className="flex my-5  transition-transform duration-1000 ease-in-out ">
                          <ShoppingCart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400  transition-transform duration-1000 ease-in-out" />
                        </span>
                      </li>
                      <li>
                        <span className="flex my-5  transition-transform duration-1000 ease-in-out">
                          <Trash
                            onClick={() =>
                              handlehighlightedcardDelete(highlightedCard._id)
                            }
                            className="text-sky-950 size-10 hover:scale-110 hover:text-sky-400  transition-transform duration-1000 ease-in-out"
                          />
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
                          <Pencil className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400 " />
                        </span>
                      </li>
                      <li onClick={() => router.push("../payment/orders")}>
                        <span className="flex my-5 ">
                          <ShoppingCart className="text-sky-950  size-10 hover:scale-110 hover:text-sky-400 " />
                        </span>
                      </li>
                      <li>
                        <span className="flex my-5 ">
                          <Trash
                            onClick={() => handleDelete(highlightedCard._id)}
                            className="text-sky-950 size-10 hover:scale-110 hover:text-sky-400 "
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 flex relative left-44">
              All Highlighted cards will display here
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
