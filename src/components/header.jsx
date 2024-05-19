"use client";
export default function Header() {
  return (
    <div className="mx-auto font-poppins  max-w-screen-xl flex items-center w-full justify-between bg-indigo-300 p-4 ">
      <div className="">Itinerator</div>
      {/* bagian kanan header */}
      <div className="flex gap-4">
        <div className="hover:text-indigo-600 font-medium cursor-pointer">
          Home
        </div>
        <div className="hover:text-indigo-600 font-medium cursor-pointer">
          About Us
        </div>
        <div className="hover:text-indigo-600 font-medium cursor-pointer">
          Profile
        </div>
      </div>
    </div>
  );
}
