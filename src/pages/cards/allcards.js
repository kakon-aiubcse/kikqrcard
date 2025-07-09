//all the designed card will be here

import QRCodeGenerator from "../qrsettings/QRCodeGenerator";

const Allcards = () => {
  let urlToEncode = "https://www.reddit.com/user/kakonaiubcse/";

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen py-2 px-1 items-center justify-center xs:gap-2 xs:relative xs:h-full xs:mb-32">
        <div className=" flex items-center justify-center pr-60 xs:pr-0">
          <span className="text-6xl font-cp p-4 m-4 text-brand font-bold">
            All Cards.
          </span>
        </div>
        {/* Cards Section */}
        {/* first card */}
        <div className="flex flex-row items-start justify-center  w-screen   pr-72 tb:pr-48 tb:flex tb:flex-col tb:items-center tb:justify-start xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2 ">
          <div className="flex flex-col h-[280px] w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-l from-indigo-500 to-sky-500 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="shadow-2xl">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-xl font-ios text-slate-200 mb-20 mr-2 relative right-20 bottom-4 whitespace-nowrap xs:text-sm xs:right-14">Connection creates community.</span>
                <span className="font-ios text-xl flex-col relative bottom-10 right-5 ">
                  Scan QR
                  <img src="/left-arrow.svg" className="flex relative w-[50px] h-[30px] " />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span className="text-xs font-ios font-extralight text-slate-300"> &copy; 2025, KIK QRcards. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px] w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-l from-indigo-500 to-sky-500 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span className="text-3xl font-ios relative p-5 m-5 bottom-7 font-bold italic text-sky-100 xs:text-xl">Khairul Islam Kakon</span>
              <span className="text-base font-cp font-semibold relative bottom-16 text-slate-300">Software Engineer</span>
            </div>
            <div className="w-full relative bottom-4 h-[10%] flex items-center justify-center space-x-4">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-ios text-slate-300  font-bold
           text-[20px] leading-[30px] tracking-[15px] shadow-2xl"
              >
                01923089370
              </span>
            </div>
          </div>
        </div>
        {/* second card */}
           <div className="flex flex-row items-start justify-center  w-screen   pr-72 tb:pr-48 tb:flex tb:flex-col tb:items-center tb:justify-start
        xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2 ">
          <div className="flex flex-col h-[280px] w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-l from-red-600 to-slate-950 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="shadow-2xl">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-xl font-ios text-slate-200 mb-20 mr-2 relative right-20 bottom-4 whitespace-nowrap xs:text-sm xs:right-14">Connection creates community.</span>
                <span className="font-ios text-xl flex-col relative bottom-10 right-5 ">
                  Scan QR
                  <img src="/left-arrow.svg" className="flex relative w-[50px] h-[30px] " />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span className="text-xs font-ios font-extralight text-slate-300"> &copy; 2025, KIK QRcards. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px]  w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-l from-red-500 to-slate-950 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span className="text-3xl font-ios relative p-5 m-5 bottom-7 font-bold italic text-sky-100 xs:text-xl">Khairul Islam Kakon</span>
              <span className="text-base font-cp font-semibold relative bottom-16 text-slate-300">Software Engineer</span>
            </div>
            <div className="w-full relative bottom-4 h-[10%] flex items-center justify-center space-x-4">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-ios text-slate-300  font-bold
           text-[20px] leading-[30px] tracking-[15px] shadow-2xl"
              >
                01923089370
              </span>
            </div>
          </div>
        </div>
        {/* third card  */}
        <div className="flex flex-row items-start justify-center  w-screen   pr-72 tb:pr-48 tb:flex tb:flex-col tb:items-center tb:justify-start xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2 ">
          <div className="flex flex-col h-[280px] w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-r from-teal-600 to-slate-900 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="shadow-2xl">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-xl font-ios text-slate-200 mb-20 mr-2 relative right-20 bottom-4 whitespace-nowrap xs:text-sm xs:right-14">Connection creates community.</span>
                <span className="font-ios text-xl flex-col relative bottom-10 right-5 ">
                  Scan QR
                  <img src="/left-arrow.svg" className="flex relative w-[50px] h-[30px] " />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span className="text-xs font-ios font-extralight text-slate-300"> &copy; 2025, KIK QRcards. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px]  w-[30%]  lp:w-[38%] tb:w-[65%]  p-1 m-5 rounded-[20px] bg-gradient-to-r from-teal-600 to-slate-900 text-white 
          xs:w-screen xs:m-0 xs:mx-1">
            <div className="w-full  h-[20%] flex items-start justify-end">
              <svg
                width="60"
                height="40"
                viewBox="0 0 200 60"
                fill="none"
                fontStyle="italic"
                xmlns="http://www.w3.org/2000/svg"
                className="flex relative right-3"
              >
                <rect
                  width="200"
                  height="60"
                  rx="12"
                  ry="12"
                  fill="transparent"
                />

                <text
                  x="25"
                  y="45"
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize={36}
                  font-weight="700"
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
                  font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
                  fontSize="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span className="text-3xl font-ios relative p-5 m-5 bottom-7 font-bold italic text-sky-100 xs:text-xl">Khairul Islam Kakon</span>
              <span className="text-base font-cp font-semibold relative bottom-16 text-slate-300">Software Engineer</span>
            </div>
            <div className="w-full relative bottom-4 h-[10%] flex items-center justify-center space-x-4">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-ios text-slate-300  font-bold
           text-[20px] leading-[30px] tracking-[15px] shadow-2xl"
              >
                01923089370
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allcards;
