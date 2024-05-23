"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import Image from "next/image";
export default function LandingPage() {
  return (
    <div
      className="hero min-h-screen"
      //   style={{
      //     backgroundImage: `url(require("public/bg-cloud.jpg"))`,
      //     // backgroundImage: url(/bg-cloud.jpg),
      //   }}
    >
      <Image
        src="/bg-cloud.jpg"
        width={1000}
        height={1000}
        alt="background image"
        className="mix-blend-overlay relative w-full object-cover"
      />
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="mt-10 max-w-xl text-[#0378A6]">
          <h1 className="mb-5 text-5xl font-bold ">
            Your Dream Vacation, Perfectly Planned
          </h1>
          <p className="mb-5">
            Imagine a vacation where every moment is crafted to match your
            desires. No more endless hours of planning, research, or
            uncertainty. Welcome to Itinerator, where our cutting-edge AI
            algorithm creates personalized travel itineraries designed to make
            your dream vacation a reality.
          </p>
          <button className="btn btn-primary">Plan My Perfect Trip!</button>
        </div>
      </div>
    </div>
    // <div className="relative mx-auto font-poppins w-full items-center justify-center">
    //   <div className=" h-full lg:block justify-center max-h-full">
    //     <div className="absolute top-[10%] left-[5%] ">
    //       <h1 className="text-7xl text-slate-800 font-extrabold filter blur-px mx-12 my-20 ">
    //         Your Dream Vacation, Perfectly Planned
    //       </h1>
    //       <div className="text-slate-800 text-2xl font-semibold content-center my-10 textarea-bordered text-border-white">
    //         Imagine a vacation where every moment is crafted to match your
    //         desires. No more endless hours of planning, research, or
    //         uncertainty. Welcome to Itinerator, where our cutting-edge AI
    //         algorithm creates personalized travel itineraries designed to make
    //         your dream vacation a reality.
    //       </div>
    //       <button className="btn btn-primary bg-white">
    //         Plan My Perfect Trip!
    //       </button>
    //     </div>
    //     <div className=" w-full h-full">
    //       <div className="bg-gradient-to-tl from-[#F2AEDB] to-[#0378A6] max-w-full overflow-hidden ">
    //         <Image
    //           src="/bg-cloud.jpg"
    //           width={1000}
    //           height={1000}
    //           alt="background image"
    //           className="mix-blend-overlay relative w-full h-full object-cover"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
