"use client";

import { useState, useRef } from "react";
// import Cookies from "js-cookie";
import Link from "next/link";
import Select from "react-select";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

export const InputUser = () => {
  const [result, setResult] = useState(null);
  const formRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  let dayCounter = 1;
  console.log(result);
  const currencyOptions = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "IDR", label: "ID Rupiah (IDR)" },
  ];
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const [selectedCity, setSelectedCity] = useState("");

  async function handleGenerateTrip(formData) {
    let city = selectedCity;
    if (!city && !stateid) {
      city = selectedCountry;
    }
    const duration = formData.get("duration");
    const numberOfPeople = formData.get("numberOfPeople");
    const currency = formData.get("currency");
    const budget = formData.get("budget");
    const numberOfActivity = formData.get("numberOfActivity");
    const typeOfActivity = formData.get("typeOfActivity");

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
    setResult(parsedData);
    formRef.current.reset();
    setCountryid(0);
    setstateid(0);
  }

  async function handleSaveTrip() {
    const res = await fetch("/api/v1/generated", {
      method: "POST",
      body: JSON.stringify({
        trip: result.trip,
        duration: result.duration,
        numberOfTravelers: result.numberOfTravelers,
        totalBudget: result.totalBudget,
        activities: result.activities,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const handleNewTrip = () => {
    setResult(null); // Clear previous trip results
    formRef.current.reset(); // Reset form fields
    setCountryid(0); // Reset country select
    setstateid(0); // Reset state select
    setSelectedCity(""); // Reset selected city
  };

  return (
    <main className="max-w-md m-auto my-12 space-y-7">
      <h1 className="text-3xl font-bold text-center mb-8">
        Plan Your Next Adventure!
      </h1>
      <form ref={formRef} action={handleGenerateTrip} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountrySelect
            countryid={countryid}
            onChange={(e) => {
              setCountryid(e.id);
              setSelectedCountry(e.name); // Update selected country name
            }}
            placeHolder="Select Country"
          />
          <StateSelect
            name="city"
            countryid={countryid}
            onChange={(e) => {
              const cityName = e.name || selectedCountry; // If state is empty, use the selected country name
              setSelectedCity(cityName);
              setstateid(e.id);
            }}
            placeholder="Select City"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3 days)"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="number"
            name="numberOfPeople"
            placeholder="Number of People"
            min="1"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <Select
            name="currency"
            placeholder="Select Currency"
            options={currencyOptions}
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            min="1"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="number"
            name="numberOfActivity"
            placeholder="Number of Activities"
            min="1"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <select
            name="typeOfActivity"
            defaultValue=""
            className="select select-primary w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
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
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Generate My Trip
        </button>
      </form>
      {result && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{result.trip}</h2>
          <div>
            {result.activities.map((activity, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold">Day {index + 1}</h3>
                <div className="space-y-2">
                  {activity.activitiesOnDay.map((item, i) => (
                    <div key={i}>
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
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleSaveTrip}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save
            </button>
            <button
              onClick={handleNewTrip}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Generate New Trip
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
