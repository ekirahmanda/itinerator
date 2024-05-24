"use client";

import { useRouter } from "next/navigation";
// import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

import Image from "next/image";

import React from "react";

const LandingPage = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <section className="relative bg-blueGray-50">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url(/bg-2.jpg)",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-30 bg-black"
          ></span>
        </div>
        {/* Bagian judul */}
        <div className="pt-24 pb-32 mb-5 relative flex content-center items-center justify-center min-h-screen-75">
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center font-poppins ">
                <div className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <h1 className="text-white font-bold text-5xl">
                    Your Dream Vacation, Perfectly Planned
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Enjoy a flawlessly planned and stress-free vacation with our
                    AI-powered itinerary creator. Personalized for you. For
                    Free.
                  </p>
                </div>
                <div className="mx-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <Link href="/create">
                    <button className="mt-11 btn btn-info bg-[#0378A6] hover:bg-blue-500 max-w-60 text-white font-normal rounded-xl">
                      Plan My Perfect Trip
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            ></svg>
          </div>
        </div>
        <div className="relative  flex content-center items-center justify-center min-h-28">
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center font-poppins ">
                <div className=" drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                  <h1 className="text-white font-bold text-5xl">
                    Why You Should Try Now
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            ></svg>
          </div>
        </div>
        <section className="pb-10 bg-blueGray-200 ">
          <div className="text-[#0378A6] container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className=" w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <Image
                        src="/fixpersonalized.png"
                        alt="personalized"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                        priority
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Personalization Perfection
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Our AI crafts itineraries tailored to your preferences and
                      travel style. Just input your details and let our
                      technology do the rest.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <Image
                        src="/fixedit.png"
                        alt="personalized"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                        priority
                      />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Effortless and Adjustable
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Stress-free planning with top recommendations. Not
                      satisfied? Adjust preferences, and our AI will refine your
                      itinerary to suit your needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className=" w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <Image
                        src="/fixshare.png"
                        alt="personalized"
                        width={50}
                        height={50}
                        className="cursor-pointer"
                        priority
                      />
                    </div>
                    <h6 className="text-xl font-semibold">Easy to Share</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Save your generated itinerary and share it effortlessly
                      with your travel companions, friends, or anyone else.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-1">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </section>
    </>
  );
};

export default LandingPage;
