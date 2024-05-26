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
              Itinerator was founded on March 26 2024 when Devscale program
              decided to gather 3 outstanding individuals to become one team in
              order to help the world to become a better place.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 px-4 ml-auto mr-auto mt-10 mb-20 text-left font-poppins ">
          <div className=" ">
            <h2 className="text-black font-bold text-3xl mb-10">
              Introducing: The Bitcrafters
            </h2>

            <div className="text-slate-800 mb-10 flex justify-content gap-10">
              <div className=" ">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src="/irina.webp" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg "> Irina Laifa - CPO</h3>
                <p className="font-normal text-md ">
                  currently working as Quality Assurance but nothing to do with
                  coding 😆. Eager to learn how to code and keep improving the
                  way of learning programming
                </p>
              </div>
            </div>
            <div className="text-slate-800 mb-10 flex justify-content gap-10">
              <div className=" ">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src="/bagas.jpg" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg ">
                  Bagas Anindhito - CTO
                </h3>
                <p className="font-normal text-md ">
                  Urban and regional planning graduate who is still trying to
                  learn to code. Sleep enjoyer yet also a backlog nintendo
                  switch game collector.
                </p>
              </div>
            </div>
            <div className="text-slate-800 mb-10 flex justify-content gap-10">
              <div className=" ">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src="/ekifix.JPG" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg ">Rizki Rahmanda - CEO</h3>
                <p className="font-normal text-md ">
                  Chess and board game enthusiast, and aspire to create game
                  with his newly founded programming skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
