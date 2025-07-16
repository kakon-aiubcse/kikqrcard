import React from "react";

const Logoxl = () => {
  return (
    <>
      <svg
        width="140"
        height="40"
        viewBox="0 0 200 60"
        fill="none"
        fontStyle="italic"
        xmlns="http://www.w3.org/2000/svg"
        className="flex relative right-3"
      >
        <rect width="200" height="60" rx="12" ry="12" fill="transparent" />

        <text
          x="25"
          y="45"
          fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
          fontSize={36}
          fontWeight="700"
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
          fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
          fontSize={24}
          fill="white"
          fontWeight="600"
        >
          QRcards
        </text>
      </svg>
    </>
  );
};

export default Logoxl;
