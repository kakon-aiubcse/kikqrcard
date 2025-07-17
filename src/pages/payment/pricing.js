//pricing section
import React, { forwardRef } from "react";
import { useRouter } from "next/router";

const Pricing = forwardRef((props, ref) => {
  const router = useRouter();
  return (
    <div
      ref={ref}
      id="pricing"
      className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen "
    >
      <div className=" flex flex-col items-center justify-center pr-60 xs:pr-0">
        <span className="text-2xl text-slate-400 font-cp font-medium xs:text-xl">
          Smart investing. 10× returns.
        </span>
        <span className="text-5xl font-cp p-4 m-4 text-brand font-bold lp:text-4xl tb:text-3xl xs:text-2xl">
          Explore Our QRcard Plans and Choose Yours
        </span>
      </div>
      <div
        className="grid grid-cols-3 items-start justify-evenly  pr-60  p-3 m-2 gap-16 
       xs:pl-4 xs:grid-cols-1 lp:grid-cols-3 tb:grid-cols-2 xb:grid-cols-3 xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1"
      >
        <div className="bg-violet-100 w-[300px] xb:w-[350px] rounded-lg shadow-xl border border-violet-700 relative hover:bottom-2  hover:border-2 transition-all duration-1000  h-[700px] text-sky-800 mx-2 tb:w-[260px] ">
          <div className="flex flex-col items-start justify-start p-4">
            <span className="bg-brand text-white rounded-lg p-2 font-cp font-semibold">
              KIK QRcard
            </span>
            <span className="text-lg font-cp font-bold text-black">
              {" "}
              Discover
            </span>
            <span className="flex items-start justify-start text-black p-1 m-3 font-ios font-medium">
              <span className="text-5xl p-1 ">Free </span>
              <span className="relative top-7 ml-1">/30 days</span>
            </span>
            <span className="font-ios text-black font-medium my-4">
              This is free way to discover our digital cards.
            </span>
            <span className="bg-slate-500 my-[1px] w-[270px] h-[1px] tb:w-[220px]"></span>
            <span className=" text-brand rounded-lg relative top-4 py-2 font-cp font-semibold">
              KIK QRcard features
            </span>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 virtual card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                3 Social link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 Product
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 gallery photo
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Daily Maintenance
              </span>
            </div>
            <span className=" text-brand rounded-lg relative top-6 py-2 font-cp font-semibold">
              Additional features
            </span>
            <div className="flex px-2 mx-2 relative top-6">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 Premium card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 Google Map link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Whatsapp enabled
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Set up
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Support
              </span>
            </div>{" "}
            <button
              onClick={() => {
                router.push("../authentication/signup");
              }}
              className="flex relative top-10 left-10 bg-black text-white rounded-lg w-[100px] h-[45px] m-2 p-1 font-ios text-xl font-semibold items-center justify-center
       lp:m-2 lp:p-1 shadow-xl "
            >
              Sign up
            </button>{" "}
          </div>
        </div>
        <div className="bg-violet-100 w-[300px] xb:w-[350px] rounded-lg shadow-xl border border-violet-700 relative hover:bottom-2 hover:border-2 transition-all duration-1000  h-[700px] text-sky-800 mx-2 tb:w-[260px] ">
          <div className="flex flex-col items-start justify-start p-4">
            <span className="bg-brand text-white rounded-lg p-2 font-cp font-semibold">
              KIK QRcard
            </span>
            <span className="text-lg font-cp font-bold text-black">
              {" "}
              Personal
            </span>
            <span className="flex items-start justify-start text-black p-1 m-3 font-ios font-medium">
              <span className="text-5xl p-1 ">10$ </span>
              <span className="relative top-7 ml-1">Forever</span>
            </span>
            <span className="font-ios text-black font-medium my-4">
              Designed to meet every individual's QR card needs
            </span>
            <span className="bg-slate-500 my-[1px] w-[270px] h-[1px] tb:w-[220px]"></span>
            <span className=" text-brand rounded-lg relative top-4 py-2 font-cp font-semibold">
              KIK QRcard features
            </span>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 virtual card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                5 Social link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                2 Product
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                5 gallery photo
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Daily Maintenance
              </span>
            </div>
            <span className=" text-brand rounded-lg relative top-6 py-2 font-cp font-semibold">
              Additional features
            </span>
            <div className="flex px-2 mx-2 relative top-6">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                1 Premium card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                3 Google Map link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Whatsapp enabled
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Set up
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="close.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Support
              </span>
            </div>{" "}
            <div className="flex">
              <button
                onClick={() => {
                  router.push("../payment/billings");
                }}
                className="flex relative top-10 left-1 bg-black text-green-500 rounded-lg w-[120px] h-[45px] m-2 p-1 font-ios text-xl font-semibold items-center justify-center
     tb:w-[80px] tb:right-6 tb:m-1 tb:text-base  lp:m-2 lp:p-1 shadow-xl"
              >
                Purchase
              </button>
              <button
                onClick={() => {
                  router.push("../authentication/signup");
                }}
                className="flex relative top-10 left-4 bg-black text-white rounded-lg w-[100px] h-[45px] m-2 p-1 font-ios text-xl font-semibold items-center justify-center
    tb:w-[80px] tb:right-6 tb:m-1 tb:text-base  shadow-xl lp:m-2 lp:p-1"
              >
                Sign up
              </button>{" "}
            </div>
          </div>
        </div>
        <div className="bg-violet-100 w-[300px] xb:w-[350px] rounded-lg shadow-xl border border-violet-700 relative hover:bottom-2 hover:border-2 transition-all duration-1000  h-[700px] text-sky-800 mx-2 tb:w-[260px] ">
          <div className="flex flex-col items-start justify-start p-4">
            <span className="bg-brand text-white rounded-lg p-2 font-cp font-semibold">
              KIK QRcard
            </span>
            <span className="text-lg font-cp font-bold text-black">
              {" "}
              Business
            </span>
            <span className="flex items-start justify-start text-black p-1 m-3 font-ios font-medium">
              <span className="text-5xl p-1 ">110$ </span>
              <span className="relative top-7 ml-1">/6 months</span>
            </span>
            <span className="font-ios text-black font-medium my-4">
              Implemented to meet company's QR card needs
            </span>
            <span className="bg-slate-500 my-[1px] w-[270px] h-[1px] tb:w-[220px]"></span>
            <span className=" text-brand rounded-lg relative top-4 py-2 font-cp font-semibold">
              KIK QRcard features
            </span>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                10 virtual card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                5 Social link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                5 Product
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                10 gallery photo
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Daily Maintenance
              </span>
            </div>
            <span className=" text-brand rounded-lg relative top-6 py-2 font-cp font-semibold">
              Additional features
            </span>
            <div className="flex px-2 mx-2 relative top-6">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                10 Premium card
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                5 Google Map link
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Whatsapp enabled
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-5">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Set up
              </span>
            </div>
            <div className="flex px-2 mx-2 relative top-4">
              <img src="check.svg" />
              <span className="relative mx-3 font-cp font-semibold ">
                Free Support
              </span>
            </div>{" "}
            <div className="flex">
              <button
                onClick={() => {
                  router.push("../payment/billings");
                }}
                className="flex relative top-10 left-1 bg-black text-green-500 rounded-lg w-[120px] h-[45px] m-2 p-1 font-ios text-xl font-semibold items-center justify-center
      tb:w-[80px] tb:right-6 tb:m-1 tb:text-base lp:m-2 lp:p-1 shadow-xl"
              >
                Purchase
              </button>
              <button
                onClick={() => {
                  router.push("../authentication/signup");
                }}
                className="flex relative top-10 left-4 bg-black text-white rounded-lg w-[100px] h-[45px] m-2 p-1 font-ios text-xl font-semibold items-center justify-center
      tb:w-[80px] tb:right-6 tb:m-1 tb:text-base lp:m-2 lp:p-1 shadow-xl"
              >
                Sign up
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Pricing;
