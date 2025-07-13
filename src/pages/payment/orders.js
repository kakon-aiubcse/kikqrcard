import React from "react";
import Sidebar from "../dashboard/sidebar";
const Order = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-[20%] xs:ml-0 xs:relative xs:top-[110px]">
        <div className="flex flex-col items-center justify-center p-2 m-2">
          <span className="flex items-center justify-center text-brand font-cp text-3xl">
            Active Orders
          </span>
         <div>
          <span>
              All your active orders will display here:
          </span>
          </div>
          
      
        </div>
        <div className="flex flex-col items-center justify-center p-2 m-2">
          <span className="flex items-center justify-center text-brand font-cp text-3xl">
            Order History
          </span>
            <div>
          <span>
              All your  order history will display here:
          </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
