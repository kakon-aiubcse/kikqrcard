import React from "react";
import Sidebar from "./sidebar";
import Profile from "./profile";

const Index = () => {
  return (
    <>
      <div className="flex  overflow-hidden xs:flex xs:flex-col ">
        <section>
          <Sidebar />
        </section>
        <section className="flex flex-col xs:relative ">
          <Profile />
        </section>
      </div>
    </>
  );
};

export default Index;
