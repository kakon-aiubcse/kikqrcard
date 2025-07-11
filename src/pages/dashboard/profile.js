//user dashboard/profile
import { useRouter } from "next/router";
import React,{ useState } from "react";
import { Menu,X } from "lucide-react";

const Profile = () => {
  const router = useRouter();
  const [showmenu, setShowmenu] = useState(false)
  return (
    <>
      <div className="relative w-full h-screen xs:w-screen xs:min-h-screen">
        <aside className="fixed left-0 top-0  w-2/12 h-screen bg-violet-100 p-4 z-10 xs:fixed  xs:w-screen xs:h-[100px]">
      {!showmenu?<Menu
        className="hidden xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
        onClick={()=>{setShowmenu(!showmenu)}}
        /> : <X
        className="hidden xs:flex xs:relative xs:left-[300px] xs:h-12 xs:w-12 xs:top-0  xs:z-50 "
        onClick={()=>{setShowmenu(!showmenu)}}
        />}  
          <div className="flex flex-col items-center justify-between h-screen xs:h-auto ">
            <div className="p-2 m-2 items-center justify-start xs:p-1 xs:m-0 xs:relative xs:right-24 xs:bottom-[45px] "
            onClick={()=>{router.push("/")}}>
       
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
            <div className={`${showmenu ? "hidden xs:flex xs:z-50 xs:bg-violet-100 xs:w-screen xs:h-screen xs:relative xs:bottom-5":"xs:hidden flex flex-col justify-center items-center relative bottom-48"}`}>
              <ul className="p-2 m-2 font-ios font-medium space-y-8 text-lg text-sky-950 xs:relative xs:left-10 xs:top-5">
                <li className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 ">Dashboard</li>
                <li className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">My Cards</li>
                <li className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">My orders</li>
                <li className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400 whitespace-nowrap">Payment History</li>
                <li className="hover:text-sky-400 xs:w-full xs:border-b xs:border-slate-700 hover:border-sky-400">Edit Profile</li>
              </ul>
            </div>
          </div>
        </aside>

        <main className="ml-[16.666667%] w-10/12 h-screen overflow-y-auto  p-4 xs:mt-[24%]">
        <div className="flex flex-col w-auto  items-start justify-start">
          <div className="">
            <span>page description</span>
          </div>
          <div>
            Profile Overview
          </div>
          <div>
            Statistics
          </div>
          <div>
            Highlighted card
          </div>

        </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
