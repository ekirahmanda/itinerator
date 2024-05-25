import prisma from "@/utils/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

async function getAllItineraryByUserId() {
  const { payload } = await jwtVerify(
    cookies().get("token").value,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  const itineraries = await prisma.itinerary.findMany({
    where: {
      userId: payload.id,
    },
  });

  return itineraries;
}

export default async function Page() {
  const itineraries = await getAllItineraryByUserId();
  console.log(itineraries);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <div>All My itineraries</div>
        <Link href="/create">
          <button>Create itinerary</button>
        </Link>
        <div>
          {itineraries.map((itinerary) => {
            return (
              <div key={itinerary.id}>
                <div>{itinerary.trip}</div>
                <Link href={`/public/${itinerary.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none w-fit">
                    Share
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
