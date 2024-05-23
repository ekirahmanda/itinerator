"use client";

import { useState, useRef } from "react";
// import Cookies from "js-cookie";

export const InputUser = () => {
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  let dayCounter = 1;

  async function handleGenerateTrip(formData) {
    const city = formData.get("city");
    const duration = formData.get("duration");
    const numberOfPeople = formData.get("numberOfPeople");
    const currency = formData.get("currency");
    const budget = formData.get("budget");
    const numberOfActivity = formData.get("numberOfActivity");
    const typeOfActivity = formData.get("typeOfActivity");

    // const token = Cookies.get("token");

    // console.log("Retrieved token:", token);
    // if (!token) {
    //   console.error("JWT token is missing.");
    //   return;
    // }

    // const res = await fetch("/api/v1/tripgenerator", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     city,
    //     duration,
    //     number_of_people,
    //     currency,
    //     budget,
    //     number_of_activity,
    //     type_of_activity,
    //   }),
    // });

    //generate trip
    const res = await fetch("/api/v1/tripgenerator", {
      method: "POST",
      body: JSON.stringify({
        city,
        duration,
        numberOfPeople,
        currency,
        budget,
        numberOfActivity,
        typeOfActivity,
      }),
    });

    const data = await res.json();
    const parsedData = JSON.parse(data.choices[0].message.content);
    console.log(parsedData);
    setResult(parsedData);
    formRef.current.reset();
  }

  const renderActivities = (activities) => {
    return activities?.map((activity, index) => (
      <div key={index}>
        <p>Activity: {activity.activity}</p>
        <p>Budget per Person: {activity.budget_per_person}</p>
        <p>Total Budget: {activity.total_budget}</p>
      </div>
    ));
  };

  //GetUserID
  // async function saveGeneratedTrip() {
  //   const token = Cookies.get("token");
  //   console.log("Retrieved token:", token);
  //   if (!token) {
  //     console.error("JWT token is missing.");
  //     return;
  //   }
  //   const itineraryUser = { ...itinerary, userId };
  //   await generatedTripDB(itineraryUser);
  // }

  // //update DB
  // async function generatedTripDB(itinerary){
  //   const res = await fetch("/api/v1/post", {
  //     method : "POST",
  //     body : JSON.stringify(itinerary),
  //     headers : {
  //       "Content-Type" : "application/json",
  //     },
  //   })
  // }

  return (
    <main className="max-w-md m-auto my-12 space-y-7">
      <h1>Let's pack your bag!</h1>
      <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
        My Saved Generated Trip Lists
      </button>
      <form ref={formRef} action={handleGenerateTrip} className="space-y-2">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              name="number_of_people"
              placeholder="Number of People"
              min="1"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              name="budget"
              placeholder="Budget"
              min="1"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="number"
              name="number_of_activity"
              placeholder="Number of Activities"
              min="1"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="col-span-3">
            <select
              name="type_of_activity"
              defaultValue=""
              className="select select-primary w-full max-w-xs block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="" disabled>
                What is your activity type plan?
              </option>
              <option value="Culinary">Culinary</option>
              <option value="History and Culture">History and Culture</option>
              <option value="Staycation">Staycation</option>
              <option value="Outdoor Activity">Outdoor Activity</option>
            </select>
          </div>
        </div>
        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
          Generate My Trip
        </button>
      </form>
      {result ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{result.trip}</h2>
          </div>
          <div>
            {Object.keys(result.itinerary).map((day, index) => (
              <div key={day} className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Day {index + 1}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2">Morning</h4>
                    {renderActivities(result.itinerary[day]?.morning)}
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2">Afternoon</h4>
                    {renderActivities(result.itinerary[day]?.afternoon)}
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="text-lg font-semibold mb-2">Evening</h4>
                    {renderActivities(result.itinerary[day]?.evening)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
              Save
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
              Share
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
};
