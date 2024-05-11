"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export const Register = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const formRef = useRef();

  async function handleRegister(formData) {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });

    // Check the response status and handle accordingly
    if (res.status === 200) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
      formRef.current.reset();

      router.push("/login");
    } else {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <form action={handleRegister} className="w-[320px]" space-y-2>
        <section>
          <h1 className="text-2xl font-medium tracking-tight">
            Create an Account
          </h1>
        </section>
        <input name="firstName" placeholder="First Name" />
        <input name="lastName" placeholder="Last Name" />
        <input name="username" placeholder="Username" />
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        <button>Register</button>
      </form>
      <div className="text-sm">
        {message !== "" ? <div>{message}</div> : null}
      </div>
    </main>
  );
};
