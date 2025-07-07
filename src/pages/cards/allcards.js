//all the designed card will be here

import QRCodeGenerator from "../qrsettings/QRCodeGenerator";

const Allcards = () => {
  let urlToEncode = "https://www.reddit.com/user/kakonaiubcse/";

  return (
    <>
      <div className="flex flex-col min-h-screen w-screen py-2 px-1 items-center justify-center xs:gap-2 xs:relative xs:top-[250px]">
        <div className=" flex items-center justify-center">
          <span className="text-6xl font-cp p-4 m-4 text-violet-500 font-bold">
            All Cards.
          </span>
        </div>
        {/* Cards Section */}
        {/* first card */}
        <div className="flex flex-row items-start justify-center  w-screen  overflow-y-auto pr-28 xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2 ">
          <div className="flex flex-col h-[280px] w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="h-5 w-5">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span>connection creates community</span>
                <span className="font-manrope  flex relative  ">
                  Scan QRCode
                  <img src="/left-arrow.svg" className="w-[10px] h-[10px]" />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span> &copy; 2024, QRCodeconnect. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px]  w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span>Khairul Islam</span>
              <span>Software Engineer</span>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center space-x-2">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-manrope text-slate-200  font-[1000]
           text-[30px] leading-[30px] tracking-[18px] shadow-2xl"
              >
                01923089370
              </span>
            </div>
          </div>
        </div>
        {/* second card */}
        <div className="flex flex-row items-start justify-center  w-screen  overflow-y-auto pr-28 xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2">
          <div className="flex flex-col h-[280px] w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="h-5 w-5">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span>connection creates community</span>
                <span className="font-manrope  flex relative  ">
                  Scan QRCode
                  <img src="/left-arrow.svg" className="w-[10px] h-[10px]" />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span> &copy; 2024, QRCodeconnect. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px]  w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span>Khairul Islam</span>
              <span>Software Engineer</span>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center space-x-2">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-manrope text-slate-200  font-[1000]
           text-[30px] leading-[30px] tracking-[18px] shadow-2xl"
              >
                01923089370
              </span>
            </div>
          </div>
        </div>
        {/* third card card */}
        <div className="flex flex-row items-start justify-center  w-screen  overflow-y-auto pr-28 xs:flex xs:flex-col xs:overflow-hidden xs:mr-1 xs:gap-2">
          <div className="flex flex-col h-[280px] w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-row items-center justify-evenly">
              <div className="flex w-1/2 items-center justify-center">
                <span className="h-5 w-5">
                  {urlToEncode && <QRCodeGenerator value={urlToEncode} />}{" "}
                </span>
              </div>
              <div className="flex flex-col w-1/2">
                <span>connection creates community</span>
                <span className="font-manrope  flex relative  ">
                  Scan QRCode
                  <img src="/left-arrow.svg" className="w-[10px] h-[10px]" />
                </span>
              </div>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center">
              <span> &copy; 2024, QRCodeconnect. All rights reserved.</span>
            </div>
          </div>
          <div className="flex flex-col h-[280px]  w-[20%] lp:w-[35%] p-1 m-5 bg-black text-white xs:w-screen xs:m-0 xs:mx-2">
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
                  font-size="24"
                  fill="white"
                  font-weight="600"
                >
                  QRcards
                </text>
              </svg>
            </div>
            <div className="w-full  h-[70%] flex flex-col items-center justify-center">
              <span>Khairul Islam</span>
              <span>Software Engineer</span>
            </div>
            <div className="w-full  h-[10%] flex items-center justify-center space-x-2">
              <img src="/call.svg" className="h-[38px] w-[36px]" />
              <span
                className=" flex relative  font-manrope text-slate-200  font-[1000]
           text-[30px] leading-[30px] tracking-[18px] shadow-2xl"
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
