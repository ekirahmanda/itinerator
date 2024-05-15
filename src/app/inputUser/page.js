import { InputUser } from "../components/InputUser";

export default function Page() {
  return <InputUser />;
}

// "use client";

// import { useState } from "react";

// export const tripGenerator = () => {
//   const [result, setResult] = useState("");

//   async function handleTripgenerator(formData) {
//     const city = formData.get("city");
//     const duration = formData.get("duration");
//     const number_of_people = formData.get("number_of_people");
//     const currency = formData.get("currency");
//     const budget = formData.get("budget");
//     const number_of_activity = formData.get("number_of_activity");
//     const type_of_activity = formData.get("type_of_activity");

//     const res = await fetch("/api/tripgenerator", {
//       method: "POST",
//       body: JSON.stringify({
//         city,
//         duration,
//         number_of_people,
//         currency,
//         budget,
//         number_of_activity,
//         type_of_activity,
//       }),
//     });
//     const data = await res.json();
//     const parsedData = JSON.parse(data.choices[0].message.content);
//   }
//   return (
//     <div>
//       <form action={handleTripgenerator} className="flex flex-col gap-2"></form>
//     </div>
//   );
// };
// // const vacationType = [
// //   {
// //     type: "culinary",
// //   },
// //   {
// //     type: "history and religion",
// //   },
// //   {
// //     type: "nature and outdoor activity",
// //   },
// // ];

// // export default function Page() {
// //   const [destination, setDestination] = useState("");
// //   const [duration, setDuration] = useState(1);
// //   const [number_of_people, setNumberofPeople] = useState(1);
// //   const [budget, setBudget] = useState("");
// //   const [totalDest, setTotalDest] = useState(1);
// //   const [vacType, setVacType] = useState(["culinary"]);

// //   async function handleGenerateItenary(formData) {
// //     const city = formData.get("city");
// //     const totalDest = formData.get("totalDest");

// //     console.log(city, totalDest);
// //     // const res = await fetch("/api/generate-itenary", {
// //     //   method: "POST",
// //     //   body: JSON.stringify({ totalDest }),
// //     // });
// //   }

// //   function handleSetVacationType(event) {
// //     const clonedVacType = [...vacType];
// //     const { name, checked } = event.target;

// //     if (checked) {
// //       clonedVacType.push(name);
// //       setVacType(clonedVacType);
// //     } else {
// //       const newClonedVacType = clonedVacType.filter((item) => item !== name); // []
// //       setVacType(newClonedVacType);
// //     }
// //   }

// //   return (
// //     <div className="max-w-lg m-auto my-12 space-y-5">
// //       <form action={handleGenerateItenary} className="flex flex-col gap-2">
// //         <label>Destination city ?</label>
// //         <input
// //           name="city"
// //           className="input input-bordered"
// //           onChange={(e) => setDestination(e.target.value)}
// //         />
// //         <label>How many days ?</label>
// //         <input
// //           name="totalDays"
// //           type="range"
// //           min={1}
// //           max={5}
// //           defaultValue={1}
// //           onChange={(e) => setDuration(e.target.value)}
// //         />
// //         <label>How many destination in a day ?</label>
// //         <input
// //           name="totalDest"
// //           type="range"
// //           min={1}
// //           max={5}
// //           defaultValue={1}
// //           onChange={(e) => setTotalDest(e.target.value)}
// //         />
// //         <label>Vacation type</label>
// //         <section className="space-y-4">
// //           {vacationType.map((vacation) => {
// //             return (
// //               <div key={vacation.type} className="flex gap-2 items-center">
// //                 <input
// //                   name={vacation.type}
// //                   type="checkbox"
// //                   class="checkbox checkbox-primary"
// //                   onChange={handleSetVacationType}
// //                 />
// //                 <label>{vacation.type}</label>
// //               </div>
// //             );
// //           })}
// //         </section>

// //         <button className="btn btn-primary">Generate itenary</button>
// //       </form>
// //       <div>
// //         You will generate itenary to {destination}, With {totalDest}{" "}
// //         destinations,
// //       </div>
// //       <div>
// //         <div>Vacation type :</div>
// //         <div>
// //           {vacType.map((item) => {
// //             return <div key={item}>{item}</div>;
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// //
