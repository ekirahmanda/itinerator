"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="font-poppins shadow-md flex justify-between footer footer-center p-2.5 bg-slate-300 opacity-80 text-base-content">
      <div className="flex justify-between items-center h-full w-full md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <h2 class="text-sm text-left text-gray-500 sm:text-center dark:text-gray-400">
          © 2024
          <a
            href="https://www.devscale.id"
            class="hover:underline"
            target="_blank"
          >
            . Bitcrafters - Devscale™
          </a>
          . All Rights Reserved.
        </h2>
        <ul className="flex flex-wrap justify-end items-start sm:mt-0">
          <Link href="/about">
            <p className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">
              About Us
            </p>
          </Link>
          <Link href="https://www.devscale.id">
            <p className="mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400">
              Contact
            </p>
          </Link>
        </ul>
      </div>
    </footer>
  );
};
