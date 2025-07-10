//blog page
import React,{ forwardRef } from "react";
import { useRouter } from "next/router";

const Blog =forwardRef((props, ref) => {
  const router = useRouter();
  const {homeref} = props;
  return (
    <div
    ref={ref}
      id="blog" 
    className=" min-h-screen flex flex-col mb-32 w-screen xs:w-screen ">
      <div className=" flex flex-col items-center justify-center pr-60 xs:pr-0">
        <span className="text-2xl text-slate-400 font-cp font-medium xs:text-base">
          Connecting People, One Scan at a Time
        </span>
        <span className="text-5xl font-cp p-4 m-4 text-brand font-bold lp:text-4xl tb:text-3xl xs:text-2xl">
          About KIK QRcards.
        </span>
      </div>
      <div
        className="flex flex-col items-start justify-evenly min-h-screen pr-60  p-3 m-2 gap-16 
       xs:pl-4  xb:gap-24 xb:p-10 xb:pr-[430px] xb:m-1"
      >
         <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            How KIK QRcards Works?
          </h2>
          <ol className="list-decimal list-inside space-y-2 font-ios text-slate-700">
            <li>Create your digital card with your contact and branding.</li>
            <li>Generate and customize your unique QR code.</li>
            <li>Share the QR to let others view your profile instantly.</li>
          </ol>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            What is KIK QRcard?
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            KIK QR Card is a digital card solution that generates a dynamic QR
            code linked to your customizable profile.<br className="hidden lp:block xb:block"/> Share your contact,
            portfolio, and business information instantly — no apps or paper
            needed.
          </p>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            Why Choose KIK QRcard?
          </h2>
          <div>
            {" "}
            {[
              {
                title: "Easy to Update",
                desc: "Edit your info anytime, instantly reflected in your card.",
              },
              {
                title: "Instant Sharing",
                desc: "Just scan and connect, no app required.",
              },
              {
                title: "Eco-Friendly",
                desc: "Ditch paper and go digital for a greener world.",
              },
              {
                title: "Professional Design",
                desc: "Sleek layout tailored for business presentation.",
              },
              {
                title: "Secure",
                desc: "You control your data and what others see.",
              },
              {
                title: "Mobile Ready",
                desc: "Optimized for all devices and screens.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className=" p-5 rounded-xl  transition"
              >
                <h3 className="text-lg font-semibold text-sky-950 font-cp">
                  {item.title}
                </h3>
                <p className="text-slate-700 text-sm mt-2 font-ios">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            Who Is It For?
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            Freelancers, business professionals, students, creators, and anyone who wants to network smarter and faster.
          </p>
        </div>
         <div className="flex flex-col w-screen p-1 xs:w-[350px] tb:w-[500px] lp:w-[1100px] xb:w-[1700px]">
          <h2 className="text-2xl font-semibold mb-3 text-sky-800 font-cp">
            Our Mission & Vision
          </h2>
          <p className=" leading-relaxed text-slate-700 font-ios">
            <strong>Mission:</strong> To simplify how people connect and share information through innovative digital tools.
          </p>
           <p className=" leading-relaxed text-slate-700 font-ios">
           <strong>Vision:</strong> To become the go-to digital card platform for professionals around the world.
          </p>
        </div>
         <button
            className="flex  bg-sky-900 text-white rounded-lg w-[240px] h-[65px] m-4 p-2 font-ios text-xl font-semibold items-center justify-center
      lp:m-3 lp:p-1 "
      onClick={() => {
              homeref?.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Let's Start!
          </button>
          

      </div>
    </div>
  );
});

export default Blog;
