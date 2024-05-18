"use client";

import { useState } from "react";

export const InputUser = () => {
  const [result, setResult] = useState(null);

  async function handleGenerateRecipe(formData) {
    const city = formData.get("city");
    const duration = formData.get("duration");
    const number_of_people = formData.get("number_of_people");
    const currency = formData.get("currency");
    const budget = formData.get("budget");
    const number_of_activity = formData.get("number_of_activity");
    const type_of_activity = formData.get("type_of_activity");

    const res = await fetch("/api/tripgenerator", {
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
    setResult(parsedData);
    console.log(parsedData);
  }
  return (
    <main className="max-w-md m-auto my-12 space-y-7">
      <form className="space-y-2">
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
          <h3>{result.trip}</h3>
        </div>
      ) : null}
    </main>
  );
};
