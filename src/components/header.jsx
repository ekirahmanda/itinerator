"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = jwt.decode(token);
    if (!userData) {
      setUser({});
      setLoggedIn(false);
    } else {
      setUser(userData);
      setLoggedIn(true);
    }
  }, []);

  function Logout() {
    setUser();
    setLoggedIn(false);
    Cookies.remove("token");

    router.push("/");
  }

  return (
    <header className="font-poppins shadow-md flex justify-between p-2 antialiased bg-white-200">
      <div className="flex justify-between items-center h-full w-full px-4 md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={105}
            height={50}
            className="cusor-pointer"
            priority
          />
        </Link>
        <nav className="flex justify-between gap-2">
          {!loggedIn ? (
            <div className="flex gap-2">
              <Link href="/register">
                <button className="btn btn-accent rounded-xl p-4">
                  Register
                </button>
              </Link>
              <Link href="/login">
                <button className="btn btn-outline btn-secondary rounded-xl p-4">
                  Login
                </button>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/create">
                <button className="btn btn-outline btn-info text-sm rounded-xl">
                  Create Itinerary
                </button>
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar placeholder"
                >
                  <div className="min-w-full items-center border rounded-xl shadow-md">
                    <Image
                      src={`https://pub-73a71c39bead456880e242180e906006.r2.dev/itinerator/${user?.id}/${user?.avatar}`}
                      width={50}
                      height={50}
                      alt="avatar"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="justify-between font-light"
                    >
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/user" className="justify-between font-light">
                      My Profile
                    </Link>
                  </li>
                  {}
                  <li>
                    <a className="justify-between font-bold" onClick={Logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
