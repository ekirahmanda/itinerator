"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

import Image from "next/image";
import { toast } from "react-hot-toast";

export const Login = () => {
  const router = useRouter();

  async function handleLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      const jsonRes = await res.json();

      toast.success(jsonRes.message);
      localStorage.setItem("userdata", JSON.stringify(jsonRes.payload));
      Cookies.set("token", jsonRes.token);

      router.push("/create");
    } else {
      const jsonRes = await res.json();
      toast.error(jsonRes.errorMessage);
    }
  }

  return (
    <main className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-full flex-col hidden lg:block">
        <div className="absolute top-[33%] left-[10%] flex flex-col">
          <h1 className="text-7xl text-slate-800 font-extrabold filter blur-px my-4">
            Welcome back, <br /> traveler!
          </h1>
        </div>
        <div className="flex w-full h-full">
          <div className="bg-gradient-to-tl from-[#F2AEDB] to-[#0378A6] max-w-full overflow-hidden ">
            <Image
              src="/bg-people.jpg"
              width={1000}
              height={1000}
              alt="background image"
              className="mix-blend-overlay relative w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="font-poppins h-full bg-white flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col mb-4">
            <h3 className="text-4xl font-semibold text-[#0378A6]">
              Login to your account
            </h3>
          </div>
          <form
            action={handleLogin}
            className="w-full flex flex-col justify-center items-center rounded-xl space-y-2 mb-5 max-w-full"
          >
            <input name="username" placeholder="Username" className="text-sm" />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="text-sm"
            />
            <button className="bg-[#0378A6] hover:bg-primary">Login</button>
          </form>

          <div className="w-full flex items-center justify-center py-2 mb-2">
            <div className="w-full h-[0.5px] bg-gray-500"></div>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-normal">Do not have an account yet?</p>
            <Link
              href="/register"
              className="text-sm font-medium underline underline-offset-2 cursor-pointer hover:text-primary "
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
