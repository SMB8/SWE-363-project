import React from "react";
import pic from "../assets/pic.png";
import blob from "../assets/Group 7.png";
const Main = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-8 lg:px-50 py-12 lg:py-80">
      {/* Left panel */}
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
          <button className="bg-blue-900 hover:bg-blue-800 px-6 py-3 rounded-full font-medium transition">
            Sign in now
          </button>
          <button className="bg-white bg-opacity-75 hover:bg-opacity-100 text-blue-900 px-6 py-3 rounded-full font-medium transition">
            Sign up now
          </button>
        </div>
      </div>

      {/* Right: oversized blob + illustration */}
      <div className="relative mt-12 lg:mt-0">
        {/* Blob SVG as background, scaled to 150% and offset */}
        <img
          src={blob}
          alt=""
          aria-hidden="true"
          className="
          absolute 
          -top-10      
          -left-8       
          w-[150%]      
          scale-[1.5]        
          h-auto 
          object-contain
        "
        />

        {/* Foreground illustration */}
        <img
          src={pic}
          alt="Networking Illustration"
          className="relative z-10 w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Main;
