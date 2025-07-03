//this is homepage import React, { useState } from "react";
import QRCodeGenerator from "./qrsettings/QRCodeGenerator";

const Home = () => {
  let urlToEncode = "https://www.reddit.com/user/kakonaiubcse/";

  return (
    <div className="min-h-screen flex flex-row items-center justify-center w-screen xs:h-screen xs:flex xs:flex-col xs:bg-slate-400">
      <h1 className="text-4xl font-bold text-gray-950 mb-6 flex relative bottom-[240px]">
        QRCONNECT
      </h1>

      <div className=" w-[648px] h-[408px] items-center overflow-hidden  rounded-[20px] bg-gradient-to-r from-indigo-400 to-sky-500  flex relative right-[180px] p-6   shadow-md">
        <img
          src="/dollar.svg"
          className="flex absolute right-[270px]  top-[-405px] opacity-20 rotate-[15deg] w-[700px] h-[1000px] overflow-hidden "
        />
        <div className="flex relative w-[160px] left-[50px]">
          {" "}
          {urlToEncode && <QRCodeGenerator value={urlToEncode} />}
        </div>
        <div>
          <span className="font-manrope w-[300px] text-[20px] flex relative font-[800px] leading-[30px] left-[120px] bottom-[50px] text-slate-200">
            Your network is your net worth.
          </span>
          <span className="font-manrope text-[30px] flex relative font-[800px] leading-[30px] left-[170px] bottom-[0px] bg-gradient-to-r from-slate-200 via-orange-200 to-pink-600 bg-clip-text text-transparent">
            Scan QRCode
            <img
              src="/left-arrow.svg"
              className="w-[100px] h-[50px] flex absolute top-[40px] left-[40px]"
            />
          </span>
        </div>
        <div className=" flex absolute h-[10] w-[400px] text-[12px] top-[310px] left-[75px]">
          <span className="text-slate-800 font-manrope tracking-[2px] font-[400]">
            <span className="text-rose-600">*</span> Scan the QR code to
            connect.
          </span>
        </div>
        <div className="bg-transparent h-[40px] w-[200px]  flex relative bottom-[180px] right-[5px]">
          <img
            src="/logo.svg"
            className="h-[45px] w-[70px] flex relative left-[-20px]"
          />
          <span className="font-manrope flex relative text-slate-300 top-[18px] right-[30px] w-[100px] leading-[15px] h-[30px] text-[17px] font-[500] ">
            QRCodeconnect <span className="text-rose-500 ">.</span>
          </span>
        </div>
        <div className="flex relative top-[200px] right-[340px]  w-[300px] h-[20px] whitespace-nowrap  text-[8px] text-slate-300  ">
          <span> &copy; 2024, QRCodeconnect. All rights reserved.</span>
        </div>
      </div>
      <div className=" w-[648px] h-[408px] items-center rounded-[20px] bg-gradient-to-r from-indigo-500 to-sky-500  flex relative right-[40px] p-6   shadow-md">
        <div className="w-[550px] h-[40px] relative bottom-[30px]">
          <span
            className="font-manrope text-[40px] flex relative font-[800px] shadow-2xl
          leading-[30px] left-[130px] bottom-[0px] bg-gradient-to-r from-slate-200 via-orange-200 to-pink-600 bg-clip-text text-transparent"
          >
            Khairul Islam Kakon.
          </span>
          <span
            className="font-manrope text-[20px] flex relative font-[800px] shadow-2xl tracking-[2px]
          leading-[30px] left-[200px] top-[10px] text-slate-300 opacity-50"
          >
            Software Engineer
          </span>
        </div>
        <div className="bg-transparent-500 h-[40px] w-[200px]  flex relative bottom-[180px] left-[50px]">
          <img
            src="/logo.svg"
            className="h-[45px] w-[70px] flex relative left-[10px]"
          />
          <span className="font-manrope flex relative text-slate-300 top-[18px] right-[1px] w-[100px] leading-[15px] h-[30px] text-[17px] font-[500] ">
            QRCodeconnect <span className="text-rose-500 ">.</span>
          </span>
        </div>
        <div className="flex flex-row relative top-[130px] h-[20px] w-[100px] right-[440px]  ">
          <img src="/call.svg" className="h-[38px] w-[36px]" />
          <span
            className=" flex relative top-[3px] font-manrope text-slate-200 opacity-60 font-[1000]
          left-[15px] text-[30px] leading-[30px] tracking-[22px] shadow-2xl"
          >
            01923089370
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
