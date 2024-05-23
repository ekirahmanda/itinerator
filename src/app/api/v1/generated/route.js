import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// //generated that will be saved to database
// export async function POST(req) {
//     const{ trip, day, activiy, budget per person, total budget, user_id} = await req.json();
//     const nanoId = nanoid();
//     try {
//             const generatedTrip = await prisma.posts.create({
//                 data : {
//                     trip, day, activiy, budget per person, total budget, user_id
//                     //fill up based on database
//                 },
//             });
//             console.log(generatedTrip);

//             return Response.json(
//             {message : "Trip itinerary has been generated successfully", data :generatedTrip},
//             {status : 201}
//             );
//         }
//         catch (error) {
//             console.Response.json(
//                 {error : "Failed to generate the trip itinerary"},
//                 {status : 500}
//             );
//         }
// }

// //get posts based on Id
// export async function GET(req) {
//     try {
//         const searchParams = req.nextUrl.searchParams;
//         const userId = searchParams.get("userId");

//         let itinerary; //this to get data from itinerary model
//         if (userId){
//             itinerary = await prisma.posts.findMany({
//                 where : {
//                     userId : userId
//                 }
//             });
//         } else {
//             itinerary = await prisma.posts.findMany();
//         }
//         return Response.json({
//             message : "Your recipe!",
//             data : itinerary,
//         },
//     {status : 201});
//     } catch (error) {
//         console.error("Error fetching itinerary", error);
//         return Response.json(
//             {error : "Fail to fetch the itinerary"},
//             {status:500}
//         );
//     }
// }

// //delete generated trip
// export async function DELETE(req, {params}) {
//     const itineraryId = params.id;

//     await prisma.posts.delete({
//         where: {
//             id : itineraryId,
//         },
//     });
//     return Response.json({message :"deleted successfully"});
// }
