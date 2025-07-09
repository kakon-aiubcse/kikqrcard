//frequently asking question page

import React from "react";

const Faq = () => {
  return (
    <div className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen ">
      <div className=" flex flex-col items-center justify-center pr-72 xs:pr-0">
        <span className="text-4xl font-cp p-4 m-4 text-brand font-bold lp:text-4xl tb:text-3xl xs:text-2xl xs:relative xs:right-[44px]">
          Frequently Asked Questions
        </span>
      </div>
      <div
        className="grid grid-cols-3 items-start justify-evenly  pr-60  p-3 m-2 gap-8 
       xs:pl-0 xs:grid-cols-1 lp:grid-cols-2 tb:grid-cols-1 xb:grid-cols-3 xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1"
      >
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px]">
         
          <div>
            {" "}
            {[
              {
                q: "What is a KIK QRcard?",
                a: "It's a digital business card with a dynamic QR code that links to your personalized profile.",
              },
              {
                q: "Do I need to download an app to use it?",
                a: "No app is required. Just scan the QR code with any smartphone camera.",
              },
              {
                q: "Can I edit my card details later?",
                a: "Yes, you can update your profile anytime. Your QR code stays the same.",
              },
              {
                q: "Is my data secure?",
                a: "Yes, your information is securely stored and you control what’s visible to others.",
              },
              {
                q: "Can I use it for personal and professional purposes?",
                a: "Absolutely. KIK QRcard is flexible for both business and personal use.",
              },
            ].map((item, index) => (
              <div key={index} className=" p-5 rounded-xl  transition">
                <h3 className="text-lg font-semibold text-sky-950 font-cp">
                  {item.q}
                </h3>
                <p className="text-slate-700 text-sm mt-2 font-ios">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Faq;
