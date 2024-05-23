"use client";
export default function Header() {
  return (
    <div className=" sticky top-0 z-50 text-white mx-auto font-poppins flex items-center w-full justify-between bg-[#037BA6] p-4 ">
      <div className="font-bold">Itinerator</div>
      {/* bagian kanan header */}
      <div className="flex gap-12">
        <div className="hover:text-pink-400 font-medium cursor-pointer">
          Home
        </div>
        <div className="hover:text-pink-400 font-medium cursor-pointer">
          About Us
        </div>
        <div className="hover:text-pink-400 font-medium cursor-pointer">
          Register
        </div>
      </div>
    </div>
  );
}
