"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import jwt from "jsonwebtoken";

import Image from "next/image";
import { toast } from "react-hot-toast";

export const UserProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  async function handleUpdate(formData) {
    const res = await fetch("/api/v1/user/profile", {
      method: "PUT",
      body: formData,
    });

    // Check the response status and handle accordingly
    if (res.status === 200) {
      const jsonRes = await res.json();
      toast.success(jsonRes.message);

      router.push("/user");
    } else {
      const jsonRes = await res.json();
      toast.error(jsonRes.errorMessage);
    }
  }

  useEffect(() => {
    const token = Cookies.get("token");
    const data = jwt.decode(token);
    setUser(data);
  }, []);

  return (
    <main className="flex justify-center items-center">
      <main className="font-poppins w-1/2 rounded-2xl shadow-md p-10 border grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div className="w-full p-4 rounded-2xl sm:p-6 lg:p-8 bg-white shadow-sm">
          <h2 className="text-3xl font-semibold block">My Profile</h2>
          <p className="text-md text-gray-600 mb-2">
            Have a good day {user?.firstName} {user?.lastName}!
          </p>
          <div className="w-full p-4 flex justify-center">
            <Image
              src={
                user !== null
                  ? `https://pub-73a71c39bead456880e242180e906006.r2.dev/itinerator/${user?.id}/${user?.avatar}`
                  : "/default.png"
              }
              width={300}
              height={300}
              alt="avatar"
              className="min-w-full items-center border rounded-xl shadow-md"
            />
          </div>
        </div>
        <div className="w-full p-4 rounded-2xl sm:p-6 lg:p-8 bg-white shadow-sm">
          <form action={handleUpdate} className="rounded shadow p-8 mt-4 mb-4">
            <input name="username" value={user?.username} hidden />
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="pb-6">
                <h2 className="font-semibold block pb-1">First Name</h2>
                <div>
                  <input
                    disabled
                    name="firstName"
                    className="border-1 rounded-md px-4 py-2 w-full"
                    type="text"
                    value={user?.firstName}
                  />
                </div>
              </div>
              <div className="pb-6">
                <h2 className="font-semibold block pb-1">Last Name</h2>
                <div>
                  <input
                    disabled
                    name="lastName"
                    className="border-1 rounded-md px-4 py-2 w-full"
                    type="text"
                    value={user?.lastName}
                  />
                </div>
              </div>
            </div>
            <div className="pb-6">
              <h2 className="font-semibold block pb-1">Email</h2>
              <div>
                <input
                  disabled
                  name="email"
                  className="border-1 rounded-md px-4 py-2 w-full"
                  type="text"
                  value={user?.email}
                />
              </div>
            </div>
          </form>
          <div className="flex justify-end">
            <Link
              href="/user/edit"
              className="text-sm font-light text-white bg-secondary px-3 py-3 rounded-lg shadow-md hover:bg-primary"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </main>
  );
};
