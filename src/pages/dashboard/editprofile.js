import React,{useEffect} from 'react'
import Sidebar from '../dashboard/sidebar';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Editprofile = () => {
  const router = useRouter();
    const { data: session, status } = useSession();
   useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/authentication/login");
      }
    }, [status, router]);
  
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-violet-600 font-semibold">Checking session...</p>
        </div>
      );
    }
  return (
    <>
    <Sidebar/>
    <div className='ml-[16.666667%] xs:ml-0 xs:relative xs:top-[110px]'>
       <div className="flex flex-col items-center justify-center p-2 m-2">
          <span className="flex items-center justify-center text-brand font-cp text-3xl">
          Edit Profile
          </span>
         <div>
          <span>
             
          </span>
          </div></div>
    </div>
    </>
  )
}

export default Editprofile;