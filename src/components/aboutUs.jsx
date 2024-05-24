"use client";

import { useRouter } from "next/navigation";
// import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import Image from "next/image";

import React from "react";

export const AboutUs = () => {
  return (
    <div className="container relative mx-auto bg-white">
      <div className="items-center flex flex-wrap">
        <div className="w-full lg:w-3/4 px-4 ml-auto mr-auto mt-10 mb-20 text-center font-poppins ">
          <div className=" ">
            <h1 className="text-black font-bold text-5xl mb-10">About Us</h1>
            <p className="text-slate-800 font-normal text-lg mb-10">
              Itinerator was founded on March 26 when Devscale program decided
              to gather 3 outstanding individuals to become one team in order to
              help the world become a better place.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 px-4 ml-auto mr-auto mt-10 mb-20 text-left font-poppins ">
          <div className=" ">
            <h2 className="text-black font-bold text-3xl mb-10">
              Introducing: The Bitcrafters
            </h2>
            <div className="text-slate-800 mb-10">
              <h3 className="font-semibold text-lg "> Irina Laifa - CEO</h3>
              <p className="font-normal text-md ">
                {" "}
                7 years experience as a Quality Assurance, now turned into a
                programmer implement all amazing ideas that the world needs
              </p>
            </div>
            <div className="text-slate-800 mb-10">
              <h3 className="font-semibold text-lg "> Bagas Anindhito - CTO</h3>
              <p className="font-normal text-md ">
                {" "}
                Urban and Regional Planning graduate with more than 1 year
                experiences in several companies and government agency in urban
                planning, regional development, remote sensing, and spatial
                analysis projects. Hard worker, fast learner, and have growth
                mindset to learn new things.{" "}
              </p>
            </div>
            <div className="text-slate-800 mb-10">
              <h3 className="font-semibold text-lg "> Rizki Rahmanda - CIO</h3>
              <p className="font-normal text-md ">
                Chess and board game enthusiast who now are also try to be into
                programmer so that he can develop all of those games inside the
                mind of his
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
