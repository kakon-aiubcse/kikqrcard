//user dashboard/profile
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Profile = () => {
  const router = useRouter();
  const [showmenu, setShowmenu] = useState(false);
  return (
    <>
      <div className="relative w-full h-screen xs:w-screen xs:min-h-screen overflow-x-hidden ">
        <aside className="fixed left-0 top-0  w-2/12 h-screen bg-violet-100 p-4 z-10 xs:fixed tb:h-full lp:h-full xb:h-full xs:w-screen xs:h-[100px]">
          {!showmenu ? (
            <Menu
              className="hidden xs:bg-brand xs:rounded-2xl xs:text-slate-200 xs:p-2 cursor-pointer xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
              onClick={() => {
                setShowmenu(!showmenu);
              }}
            />
          ) : (
            <X
              className="hidden xs:text-red-600 xs:bg-brand xs:rounded-2xl  xs:p-2 cursor-pointer xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
              onClick={() => {
                setShowmenu(!showmenu);
              }}
            />
          )}
          <div className="flex flex-col items-center justify-between h-screen xs:h-auto ">
            <div
              className="p-2 m-2  items-center justify-start xs:p-1 xs:m-0 xs:relative xs:right-24 xs:bottom-[45px] "
              onClick={() => {
                router.push("/");
              }}
            >
              <svg
                width="150"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="200" height="60" rx="12" ry="12" fill="#8F87F1" />

                <text
                  x="20"
                  y="45"
                  fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  fontWeight="700"
                  fill="white"
                >
                  KIK
                </text>

                <circle cx="140" cy="20" r="5" fill="teal" />
                <rect x="160" y="15" width="10" height="10" fill="blue" />
                <rect x="160" y="35" width="5" height="5" fill="black" />
                <circle cx="185" cy="40" r="3" fill="red" />

                <text
                  x="95"
                  y="45"
                  fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  fontWeight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div
              className={`${
                showmenu
                  ? "hidden xs:flex xs:z-50 xs:bg-violet-100 xs:w-screen xs:h-screen xs:relative xs:bottom-5"
                  : "xs:hidden flex flex-col justify-center items-center relative bottom-48 "
              }`}
            >
              <ul className="p-2 m-2 font-ios font-medium space-y-8 text-lg text-sky-950 xs:relative xs:left-10 xs:top-5">
                <li
                onClick={()=>{router.push("/dashboard/profile");setShowmenu(false)}} 
                className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 ">
                  Dashboard
                </li>
                <li 
                 onClick={()=>{router.push("/cards/mycards")}} 
                 className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">
                  My Cards
                </li>
                <li  onClick={()=>{router.push("/payment/orders")}}  
                className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">
                  My orders
                </li>
                <li onClick={()=>{router.push("/payment/billings")}}   
                className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 whitespace-nowrap">
                  Payment
                </li>
                <li onClick={()=>{router.push("/dashboard/editprofile")}}   
                className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">
                  Edit Profile
                </li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="ml-[16.666667%] w-10/12 h-auto lp:ml-[20%] xb:ml-[25%] xs:w-full overflow-hidden  p-4 xs:mt-[24%] xs:ml-0 xs:p-0 ">
          <div className="flex flex-col w-auto  items-start justify-start xs:w-full xs:p-4">
            <div className="flex  items-center w-full p-6 h-auto justify-start">
              <span className="text-2xl m-1 p-1 font-cp font-bold text-brand tb:text-3xl lp:text-5xl xb:text-6xl">
                User
              </span>{" "}
              <span className="text-2xl p-1  font-cp tb:text-3xl lp:text-5xl xb:text-6xl">Dashboard</span>
            </div>
            <div className="flex flex-col items-start w-full  px-6 bg-white  space-y-6">
              <h2 className="text-2xl p-2 font-semibold underline text-gray-700">
                Personal Details
              </h2>
              <img
                src="/user.jpg"
                alt="user"
                className="w-44 h-48 ml-8 rounded-full border border-brand shadow-xl"
              />
              <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
                <span className=" font-cp font-bold text-brand text-xl">
                  Name:
                </span>{" "}
                Khairul Islam Kakon
              </p>
              <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
                <span className=" font-cp font-bold text-brand text-xl">
                  Email:
                </span>{" "}
                kakon.aiubcse@gmail.com
              </p>
              <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
                <span className=" font-cp font-bold text-brand text-xl ">
                  Phone Number:
                </span>{" "}
                01923089370
              </p>
              <p className="text-lg w-screen text-slate-800 font-ios font-semibold">
                <span className=" font-cp font-bold text-brand text-xl">
                  NID:
                </span>{" "}
                445714244
              </p>
            </div>
          </div>
        </main>
        <div className="ml-[16.666667%] flex flex-col w-full xs:ml-0 relative p-4 tb:ml-[20%] lp:ml-[20%] xb:ml-[25%] h-auto items-start  overflow-hidden justify-start">
          <span className="text-2xl ml-6 font-cp font-semibold underline">Activity</span>
          <div
           className="flex flex-col items-center justify-center p-4 lp:p-8 lp:m-8 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-white rounded-2xl shadow-2xl border border-black">
            <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-950 ">Liked Cards</p> <span className="text-5xl text-teal-600 font-[1000] font-cp ">18</span>
          </div>
           <div className="flex flex-col items-center justify-center lp:p-8 lp:m-8 p-4 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-brand rounded-2xl shadow-2xl border border-black">
            <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-200 ">Profile Views</p> <span className="text-5xl text-yellow-300 font-[1000] font-cp ">35</span>
          </div> <div className="flex flex-col items-center justify-center lp:p-8 lp:m-8 p-4 w-full m-4 relative right-5 tb:w-1/2 lp:w-1/2 xb:w-1/2 bg-black rounded-2xl shadow-2xl border border-brand">
            <p className=" p-2 mx-3 text-2xl font-ios font-bold text-slate-200 ">Total Orders</p> <span className="text-5xl text-red-400 font-[1000] font-cp ">3</span>
          </div>
        </div>

         <div className=" ml-[16.666667%] lp:ml-[20%] xs:ml-0 flex flex-col w-full xb:ml-[25%] relative p-4 h-auto items-start overflow-hidden justify-start">
          <span className="text-2xl ml-6 font-cp font-semibold underline">Highlighted Cards</span>
         <span className="h-dvh p-6">
          your Highlighted cards will be here.
         </span>
        </div>
      </div>
    </>
  );
};

export default Profile;
