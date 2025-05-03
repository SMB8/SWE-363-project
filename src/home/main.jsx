import React from "react";
import pic from "../assets/pic.png";
import blob from "../assets/Group 7.png";
import { Link } from "react-router-dom";
const Main = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-8 lg:px-50 py-12 lg:py-80">
      <div className="max-w-lg space-y-6">
        <h1
          className="
    font-extrabold            
    text-[48px]               
    leading-[70px]           
    tracking-[1%]             
    text-[#084B7A]           
  "
        >
          Empowering <br /> Connection at KFUPM
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">What is KFUPM Connect?</h2>
          <p className="text-base text-white/90 leading-relaxed">
            KFUPM Connect is a smart networking platform designed exclusively
            for students at King Fahd University of Petroleum & Minerals.
            Whether you're looking to join exciting events, collaborate on
            research, or simply expand your social circle, KFUPM Connect brings
            the community closer—one connection at a time.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            to={"/sign-in"}
            className="bg-blue-900 hover:bg-blue-800 px-6 py-3 rounded-full font-medium transition"
          >
            Sign in now
          </Link>
          <Link
            to={"/sign-up"}
            className="bg-white bg-opacity-75 hover:bg-opacity-100 text-blue-900 px-6 py-3 rounded-full font-medium transition"
          >
            Sign up now
          </Link>
        </div>
      </div>

      <div className=" mt-12 lg:mt-0">
        <img
          src={blob}
          alt="Decorative background blob" // Added descriptive alt text
          aria-hidden="true" // Still decorative
          className="
              w-full         /* Full width when stacked */
              sm:w-1/3     /* 1/3 width when side-by-side */
              h-auto         /* Maintain aspect ratio */
              object-contain /* Fit image within bounds */
            "
        />

        <img
          src={pic}
          alt="Networking Illustration"
          className="
              w-full         /* Full width when stacked */
              sm:w-2/3     /* 2/3 width when side-by-side */
              h-auto         /* Maintain aspect ratio */
              object-contain /* Fit image within bounds */
            "
        />
      </div>
    </div>
  );
};

export default Main;
