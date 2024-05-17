"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    if (res.status === 200) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);

      localStorage.setItem("userdata", JSON.stringify(jsonRes.payload));
      Cookies.set("token", jsonRes.token);

      router.push("/dashboard");
    } else {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }

  return (
    <main className="h-screen grid grid-cols-2">
      <div className="bg-secondary flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold space-y-2">Welcome back, buddy!</h1>
        <h3 className="text-l font-semibold space-y-2">
          Do not have an account yet?
        </h3>
        <Link href="/register">
          <button>Sign Up</button>
        </Link>
      </div>
      <form
        action={handleLogin}
        className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-2"
      >
        <section>
          <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        </section>
        <input name="username" placeholder="Username" />
        <input name="password" placeholder="Password" type="password" />
        <button>Login</button>
      </form>
      <div className="text-sm">
        {message !== "" ? <div>{message}</div> : null}
      </div>
    </main>
  );
};
