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
    include: {
      activities: true, // Include activities related to each itinerary
    },
  });

  return itineraries;
}

export default async function Page() {
  const itineraries = await getAllItineraryByUserId();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">All My Itineraries</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="card bg-base-100 shadow-xl">
              <div className="card-body flex flex-col justify-between">
                <div>
                  <h2 className="bg-base-300 rounded-xl text-2xl md:text-3xl font-medium mt-3 text-center p-2">
                    Trip: {itinerary.trip}
                  </h2>
                  {itinerary.activities &&
                    itinerary.activities.map((activity, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-bold p-2">
                          Day {index + 1}
                        </h3>
                        <div className="space-y-2">
                          {activity.activitiesOnDay.map((item, i) => (
                            <div
                              key={i}
                              className="bg-white border rounded p-2"
                            >
                              <p className="font-semibold">Time: {item.time}</p>
                              <p>Activity: {item.activity}</p>
                              <p>Budget Per Person: {item.budgetPerPerson}</p>
                              <p>Total Budget: {item.totalBudget}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="card-actions justify-end">
                  <Link href={`/public/${itinerary.id}`}>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-4 flex justify-center">
                      Share
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
