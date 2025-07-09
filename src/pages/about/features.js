//showcasing feature
import React from "react";

const Feature = () => {
  return (
    <div className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen ">
      <div className=" flex flex-col items-center justify-center pr-60 xs:pr-0">
        <span className="text-2xl text-slate-400 font-cp font-medium">Why our digital cards?</span>
        <span className="text-5xl font-cp p-4 m-4 text-brand font-bold tb:text-3xl xs:text-3xl">
           QRcard's Features
        </span>
      </div>
      <div className="grid grid-cols-4 items-start justify-evenly xs:pl-8 pr-60  p-3 m-2 gap-16 xs:grid-cols-1 lp:grid-cols-3 tb:grid-cols-2 xb:grid-cols-4 xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1">
        {/*social links */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px]  tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative ">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/social.svg"
              className="w-[100px] h-[100px]  border-2 shadow-lg rounded-full border-gray-500 bg-brand"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Social Media Links
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            Your all social media presence in one digital business card. Stay
            connect with your customers.
          </div>
        </div>
        {/*whatsapp */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/whatsapp.svg"
              className="w-[100px] h-[100px] bg-brand rounded-xl shadow-lg "
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            WhatsApp Enabled
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            You can enable and disable WhatsApp Chat Feature in your digital
            business card.
          </div>
        </div>
        {/*gallery */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/gallery.svg"
              className="w-[100px] h-[100px] bg-brand border-2 shadow-lg rounded-full border-gray-500"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Photo Gallery
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            You can upload product photos or any business related photos in your
            gallery section.
          </div>
        </div>
        {/*youtube */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/youtube.svg"
              className="w-[100px] h-[100px] bg-brand rounded-xl shadow-lg  "
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl tb:text-xl font-semibold">
            YouTube Link Integraion
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            You can integrate your YouTube Link with your digital business card.
          </div>
        </div>
        {/*google map */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/maps.svg"
              className="w-[100px] h-[100px] bg-brand border-2 shadow-lg rounded-full border-gray-500"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl tb:text-xl font-semibold">
            Google Maps Integraion
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            You can display your shop / business location in google maps.
            Visitors can easily find you.
          </div>
        </div>
        {/*modern theme */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/theme.svg"
              className="w-[100px] h-[100px] bg-brand border-2 shadow-lg rounded-full border-gray-500"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Modern Theme
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            We used modern theme for user interface. It is fully responsive.
          </div>
        </div>
        {/*clean ui */}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/cleanui.svg"
              className="w-[100px] h-[100px] bg-brand shadow-lg rounded-xl"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Clean UI Design
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            We creafted all designs professionally. It made with latest
            frameworks.
          </div>
        </div>
        {/*faster loading*/}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/thunder.svg"
              className="w-[100px] h-[100px] bg-brand border-2 shadow-lg rounded-full border-gray-500"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Faster Loading
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            We give more importance for page load. Your digital card load faster
            than normal webpages.
          </div>
        </div>
        {/*unique links*/}{" "}
        <div className="bg-violet-100 w-[300px] h-[470px] tb:w-[250px] xb:w-[290px] tb:h-[450px] flex flex-col  rounded-ee-[200px] hover:rounded-xl border border-violet-800 hover:border-2 transition-all duration-1000 hover:bottom-[10px] relative">
          <div className="h-[40%] flex items-center m-4 p-4 justify-start  w-[50%] ">
            <img
              src="/links.svg"
              className="w-[100px] h-[100px] bg-brand border-2 shadow-lg rounded-full border-gray-500"
            />
          </div>
          <div className="h-[10%] flex items-center text-sky-800  justify-center font-ios text-2xl font-semibold">
            Unique Link
          </div>
          <div className="h-[50%] flex items-start text-slate-500 p-4 justify-center font-ios text-xl font-thin">
            Your name or business whatever it is. You can generate your business
            card link as per your choice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
