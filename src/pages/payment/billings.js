import React from "react";
import Sidebar from "../dashboard/sidebar";

const Billings = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-[16.666667%] xs:ml-0 xs:relative xs:top-[110px]">
        <div className="flex flex-col items-center justify-center p-2 m-2">
          <span className="flex items-center justify-center text-brand font-cp text-3xl">
           Payment History
          </span>
          <div>
            <span>All your payment details will display here:</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billings;
