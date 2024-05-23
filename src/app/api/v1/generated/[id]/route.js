import prisma from "@/utils/prisma";

export async function GET(req, { params }) {
  const { id } = params;

  const itinerary = await prisma.itinerary.findUnique({
    where: {
      id,
    },
    include: {
      activities: {
        select: {
          day: true,
          activitiesOnDay: true,
        },
        orderBy: {
          day: "asc",
        },
      },
    },
  });

  return Response.json(itinerary);
}
