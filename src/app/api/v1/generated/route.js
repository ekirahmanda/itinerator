import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const { payload } = await jwtVerify(
    token.value,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
  const userId = payload.id;
  const { trip, duration, numberOfTravelers, totalBudget, activities } =
    await req.json();

  const saveItinerary = await prisma.itinerary.create({
    data: {
      trip,
      duration,
      numberOfTravelers: String(numberOfTravelers),
      totalBudget,
      userId,
    },
  });

  activities.forEach(async (item) => {
    await prisma.activity.createMany({
      data: {
        day: String(item.day),
        activitiesOnDay: item.activitiesOnDay,
        itineraryId: saveItinerary.id,
      },
    });
  });

  return Response.json({ message: "success" }, { status: 200 });
}
