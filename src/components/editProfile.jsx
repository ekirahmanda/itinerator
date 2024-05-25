"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

import Image from "next/image";
import { toast } from "react-hot-toast";

export const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
  }, []);

  return (
    <main className="flex justify-center items-center">
      <main className="font-poppins shadow-none border rounded-2xl p-10 grid grid-cols-1 gap-2 lg:grid-cols-2 md:w-1/2 md:shadow-xl">
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
            <input name="id" value={user?.id} hidden />
            <input name="username" value={user?.username} hidden />
            <div className="w-full grid grid-cols-2 gap-2">
              <div className="pb-6">
                <h2 className="font-semibold block pb-1">First Name</h2>
                <div>
                  <input
                    name="firstName"
                    className="border-1 rounded-md px-4 py-2 border-pink-300 w-full "
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="pb-6">
                <h2 className="font-semibold block pb-1">Last Name</h2>
                <div>
                  <input
                    name="lastName"
                    className="border-1 rounded-md px-4 py-2 border-pink-300 w-full"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="pb-6">
              <h2 className="font-semibold block pb-1">Email</h2>
              <div>
                <input
                  name="email"
                  className="border-1 rounded-md px-4 py-2 border-pink-300 w-full"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="pb-6">
              <h2 className="font-semibold block pb-1">Change Avatar</h2>
              <div>
                <input
                  name="avatar"
                  className="block border-1 rounded-md px-4 py-2 border-slate-300 w-full "
                  type="file"
                  accept=".png, .jpg, .jpeg"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="text-sm font-light bg-[#04B2D9] px-3 py-3 rounded-lg shadow-md hover:bg-[#04C4D9]">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </main>
  );
};
