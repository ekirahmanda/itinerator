"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Link from "next/link";

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
    if (res.status === 201) {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);

      router.push("/login");
    } else {
      const jsonRes = await res.json();
      setMessage(jsonRes.message);
    }
  }

  return (
    <main className="h-screen grid grid-cols-2">
      <form
        action={handleRegister}
        className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-2"
      >
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
      <div className="bg-secondary flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold space-y-2">
          Keep connected with us!
        </h1>
        <h3 className="text-l font-semibold space-y-2">
          Already have an account?
        </h3>
        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="text-sm">
        {message !== "" ? <div>{message}</div> : null}
      </div>
    </main>
  );
};
