import React from "react";

const Logo = () => {
  return (
    <>
      <svg
        width="60"
        height="40"
        viewBox="0 0 200 60"
        fill="none"
        fontStyle="italic"
        xmlns="http://www.w3.org/2000/svg"
        className="flex relative right-3"
      >
   <rect width="200" height="80" rx="12" ry="12" fill="#8F87F1" />
  <text
    x="30"
    y="50"
    fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize="44"
    fontWeight="700"
    fill="white"
  >
    KIK
  </text>

 
  <circle cx="130" cy="20" r="5" fill="teal" />
  <rect x="145" y="15" width="10" height="10" fill="blue" />
  <rect x="145" y="35" width="5" height="5" fill="black" />
  <circle cx="175" cy="40" r="3" fill="red" />


  <text
    x="150"
    y="65"
    fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    fontSize="24"
    fill="white"
    fontWeight="600"
    textAnchor="middle"
  >
    QRcard
  </text>
      </svg>
    </>
  );
};

export default Logo;
