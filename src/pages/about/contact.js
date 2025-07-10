import React,{ forwardRef } from "react";

const Contact = forwardRef((props, ref) => {
  return (
    <div ref={ref}
      id="contact" 
    className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen ">
      <div className=" flex flex-col items-center justify-center pr-72 xs:pr-0">
       <span className="text-2xl text-slate-400 font-cp font-medium xs:text-base">
         We always here to hear you.
        </span>
        <span className="text-5xl font-cp p-4 m-4 text-brand font-bold lp:text-4xl tb:text-3xl xs:text-5xl">
          Contact
        </span>
      </div>

      <div
        className="grid grid-cols-3 items-start justify-evenly  pr-60  p-3 m-2 gap-8 
       xs:pl-0 xs:grid-cols-1 lp:grid-cols-2 tb:grid-cols-1 xb:grid-cols-3 xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1"
      >
        <div className=" items-start justify-start flex flex-col w-[300px] xb:w-[350px] rounded-lg   relative transition-all duration-1000   text-sky-800 mx-2 tb:w-[260px] ">
          <span className="text-5xl w-[350px] whitespace-nowrap font-cp font-semibold m-3 p-3">
            Contact Details
          </span>
          <span className="text-2xl text-slate-600 font-cp font-semibold mx-3 px-3 ">
            Phone: 01923089370
          </span>
          <span className="text-xl text-slate-600 mx-3 px-3 font-cp font-semibold whitespace-nowrap">
            Email: kakon.aiubcse@gmail.com
          </span>
        </div>
        <div className=" items-start justify-start flex flex-col w-[300px] xb:w-[350px] rounded-lg   relative transition-all duration-1000   text-sky-800 mx-2 tb:w-[260px] ">
          <span className="text-5xl font-cp font-semibold m-3 p-3 whitespace-nowrap">
            Social Links
          </span>
          <div className="m-5 px-3 flex gap-3">
            <img src="/facebook.svg" className="w-[40px] h-[40px]" />
            <img src="/wp.svg" className="w-[40px] h-[40px]" />
            <img src="/instagram.svg" className="w-[40px] h-[40px]" />
            <img src="/linkedin.svg" className="w-[40px] h-[40px]" />
          </div>
        </div>
        <div className="items-start justify-start flex flex-col w-[300px] xb:w-[350px] rounded-lg   relative  transition-all duration-1000 ] text-sky-800 mx-2 tb:w-[260px] ">
          <span className="text-5xl font-cp font-semibold m-3 p-3">
            Location
          </span>
          <span className="text-2xl text-slate-600 font-cp font-semibold mx-3 px-3">
            Dhaka, Bangladesh.
          </span>
        </div>
      </div>
      <div
        className=" items-center justify-center flex flex-col w-[300px] 
       xb:w-[350px] rounded-lg   relative transition-all duration-1000  my-4 py-4  left-[100px] lp:left-[100px] tb:left-[100px] xs:left-12 mx-2 tb:w-[260px] "
      >
        <form className="bg-violet-100 h-auto w-[400px]  p-6 rounded-2xl shadow-lg hover:border hover:border-violet-500 flex flex-col gap-6 items-center">
          <span className="text-xl text-slate-700 font-cp font-semibold text-center">
            Feel free to reach us
          </span>

          <div className="flex flex-col gap-4 w-full">
            <input
              placeholder="Name"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              placeholder="Email"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <input
              placeholder="Phone Number"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <textarea
              placeholder="Your Query"
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-lg font-ios font-semibold text-lg hover:bg-violet-600 transition-colors duration-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
});

export default Contact;
