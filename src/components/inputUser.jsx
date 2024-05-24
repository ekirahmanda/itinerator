"use client";

import { useState, useRef } from "react";

export const InputUser = () => {
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  let dayCounter = 1;

  async function handleGenerateTrip(formData) {
    const city = formData.get("city");
    const duration = formData.get("duration");
    const number_of_people = formData.get("number_of_people");
    const currency = formData.get("currency");
    const budget = formData.get("budget");
    const number_of_activity = formData.get("number_of_activity");
    const type_of_activity = formData.get("type_of_activity");

    const res = await fetch("/api/v1/tripgenerator", {
      method: "POST",
      body: JSON.stringify({
        city,
        duration,
        number_of_people,
        currency,
        budget,
        number_of_activity,
        type_of_activity,
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

  return (
    <main className="max-w-md m-auto my-12 space-y-7">
      <form ref={formRef} action={handleGenerateTrip} className="space-y-2">
        <textarea
          name="city"
          placeholder="city"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="duration"
          placeholder="duration"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="number_of_people"
          placeholder="number of people"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="currency"
          placeholder="currency"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="budget"
          placeholder="budget"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="number_of_activity"
          placeholder="number of activity"
          className="block border p-3 w-full"
        ></textarea>
        <textarea
          name="type_of_activity"
          placeholder="type of activity"
          className="block border p-3 w-full"
        ></textarea>
        <button>Generate My Trip</button>
      </form>
      {result ? (
        <div>
          <h2>{result.trip}</h2>
          <div>
            {Object.keys(result.itinerary).map((day) => (
              <div key={day}>
                <h3>Day {dayCounter++}</h3>
                <div>
                  <h4>Morning</h4>
                  {renderActivities(result.itinerary[day]?.morning)}
                </div>
                <div>
                  <h4>Afternoon</h4>
                  {renderActivities(result.itinerary[day]?.afternoon)}
                </div>
                <div>
                  <h4>Evening</h4>
                  {renderActivities(result.itinerary[day]?.evening)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
};
