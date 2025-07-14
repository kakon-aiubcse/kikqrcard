import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Profile from "./profile";


const Index = () => {
 


  return (
    <div className="flex overflow-hidden flex-col sm:flex-row">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col relative">
        <Profile />
        <span className="text-3xl">Name :{name} </span>
      </div>
    </div>
  );
};

export default Index;
