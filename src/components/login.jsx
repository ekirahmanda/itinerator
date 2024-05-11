"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

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

      window.location.href = "/dashboard";
    } else {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form action={handleLogin} className="w-[320px]" space-y-2>
        <section>
          <h1 className="text-2xl font-medium tracking-tight">Login</h1>
          <p>Welcome back, Traveler!</p>
        </section>
        <input name="username" placeholder="Username" />
        <input name="password" placeholder="Password" type="password" />
        <button>Login</button>
      </form>
    </main>
  );
};
