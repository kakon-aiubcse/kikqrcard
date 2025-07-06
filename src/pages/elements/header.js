//header

import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen text-bttext-0">
      {/* logo */}
      <div className="h-[20%] items-center justify-center top-5 relative">
        <div
          className="border-b-2 border-black items-center rounded-xl shadow-xl hover:shadow-2xl hover:border-b-4 hover:border-black"
          onClick={() => {
            router.push("/");
          }}
        >
          <svg
            width="200"
            height="60"
            viewBox="0 0 200 60"
            fill="none"
            font-style="italic"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="200" height="60" rx="12" ry="12" fill="#ff6500" />

            <text
              x="25"
              y="45"
              font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
              font-size="36"
              font-weight="700"
              fill="black"
            >
              KIK
            </text>

            <circle cx="140" cy="20" r="5" fill="teal" />
            <rect x="160" y="15" width="10" height="10" fill="blue" />
            <rect x="160" y="35" width="5" height="5" fill="white" />
            <circle cx="185" cy="40" r="3" fill="black" />

            <text
              x="90"
              y="45"
              font-family="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
              font-size="24"
              fill="black"
              font-weight="600"
            >
              QRcards
            </text>
          </svg>
        </div>
      </div>
      {/* nav */}
      <nav className="h-[60%] items-start ">
        <ul className="h-full flex flex-col  items-start justify-evenly relative ml-10 text-black font-semibold text-[20px]">
          <li className="text-start font-ios flex items-center gap-4">
            Home{" "}
            <span>
              <svg
                width="32"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`
      .home-icon {
        animation: pulse 1.8s infinite ease-in-out;
        transform-origin: center;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }
    `}
                </style>
                <path
                  className="home-icon"
                  d="M3 11L12 3L21 11V20C21 20.55 20.55 21 20 21H16C15.45 21 15 20.55 15 20V16C15 15.45 14.55 15 14 15H10C9.45 15 9 15.45 9 16V20C9 20.55 8.55 21 8 21H4C3.45 21 3 20.55 3 20V11Z"
                  fill="black"
                />
              </svg>
            </span>
          </li>
          <li className="text-start font-ios flex items-center gap-4">
            Cards{" "}
            <span>
              <svg
                width="48"
                height="40"
                viewBox="0 0 64 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {`
    .card-icon {
      animation: pulse 2s infinite ease-in-out;
      transform-origin: center;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `}
                </style>

                <rect
                  x="4"
                  y="8"
                  width="56"
                  height="32"
                  rx="4"
                  ry="4"
                  fill="black"
                  class="card-icon"
                />
                <rect x="10" y="14" width="24" height="4" rx="2" fill="teal" />
                <rect x="10" y="22" width="18" height="4" rx="2" fill="blue" />
                <circle cx="48" cy="24" r="6" fill="white" />
              </svg>
            </span>
          </li>
          <li className="text-start font-ios flex items-center gap-4">
            {" "}
            Features
            <span>
              <svg
                width="32"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {` .lock {
      animation: bounce 1.5s infinite;
      transform-origin: bottom;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }`}
                </style>
                <path
                  class="lock"
                  d="M6 10V8a6 6 0 1112 0v2h1a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V11a1 1 0 011-1h1zm2 0h8V8a4 4 0 10-8 0v2z"
                  fill="black"
                />
              </svg>
            </span>
          </li>
          <li className="text-start font-ios flex items-center gap-4">
            About us
            <span>
              <svg
                width="32"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>
                  {` .pulse {
      animation: pulse 2s infinite ease-in-out;
      transform-origin: center;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }`}
                </style>

                <circle class="pulse" cx="12" cy="7" r="4" fill="black" />
                <path
                  class="pulse"
                  d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z"
                  fill="black"
                />

                <circle cx="18" cy="7" r="2.5" fill="black" />
                <path
                  d="M15.5 16c0-2 2-3.5 4-3.5s4 1.5 4 3.5v1h-8v-1z"
                  fill="black"
                  opacity="0.6"
                />
              </svg>
            </span>
          </li>
        </ul>
      </nav>
      {/* profile */}
      <div className="h-[20%] flex items-center justify-center font-ios  text-black ">
        <section className="font-bold text-[25px] flex items-center gap-4">
          Profile <span>
            <svg width="32" height="40" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <style>
   {` .pulse {
      animation: pulse 2s infinite ease-in-out;
      transform-origin: center;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }`}
  </style>


  <circle class="pulse" cx="12" cy="8" r="4" fill="black"/>

  
  <path class="pulse" d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6v1H4v-1z" fill="black"/>
</svg>

          </span>
        </section>
      </div>
    </div>
  );
};

export default Header;
