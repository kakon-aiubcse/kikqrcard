//terms and codition

import React from "react";

const Tc = () => {
  return (
    <div className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen ">
      <div className=" flex flex-col items-center justify-center pr-60 xs:pr-0">
        <span className="text-5xl font-cp p-4 m-4 text-brand font-bold lp:text-4xl tb:text-3xl xs:text-2xl">
          Terms and Conditions.
        </span>
      </div>
      <div
        className="flex flex-col items-start justify-evenly min-h-screen pr-60  p-3 m-2 gap-16 
       xs:pl-4  xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1"
      >
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            1. Introduction
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            Welcome to KIK QR Card. By accessing or using our website or
            service, <br className="hidden lp:block xb:block" />
            you agree to be bound by these Terms and Conditions. Please read
            them carefully.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            2. Use of Service
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            You may use KIK QR Card only for lawful purposes. You are
            responsible for any activity that occurs under{" "}
            <br className="hidden lp:block xb:block" /> your account and for
            maintaining the confidentiality of your information.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            3. User Content
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            You retain ownership of your content, but by uploading or creating a
            card, you grant us permission to display
            <br className="hidden lp:block xb:block" /> it as part of your
            profile. You agree not to upload harmful, illegal, or misleading
            content.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            4. Privacy
          </h2>

          <p className=" leading-relaxed text-slate-700 font-ios">
            Your privacy is important to us. All personal data is handled in
            accordance with our Privacy Policy.
            <br className="hidden lp:block xb:block" /> You have full control
            over what information is shared via your QR Card.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            5. Modifications
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            We reserve the right to change these terms at any time. Updates will
            be posted here.
            <br className="hidden lp:block xb:block" /> Your continued use of
            the service means you accept any changes.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            6. Termination
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            We may suspend or terminate access to our service immediately,
            without prior notice, <br className="hidden lp:block xb:block" />
            if you violate any of the terms.
          </p>
        </div>

        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            7. Contact Us
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            If you have any questions about these Terms,
            <br className="hidden lp:block xb:block" /> please contact us at{" "}
            <span className="text-violet-600">kakon.aiubcse@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tc;
