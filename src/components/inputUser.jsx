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
    const city = selectedCity;
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

  return (
    <main className="max-w-md m-auto my-12 space-y-7">
      <h1>Let&lsquo;s pack your bag!</h1>
      <Link href="/dashboard">
        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 focus:outline-none">
          My Saved Generated Trip Lists
        </button>
      </Link>
      <form ref={formRef} action={handleGenerateTrip} className="space-y-2">
        <div className="grid grid-cols-3 gap-4">
          <CountrySelect
            countryid={countryid}
            onChange={(e) => {
              setCountryid(e.id);
            }}
            placeHolder="Select Country"
          />
          <div>
            <StateSelect
              name="city"
              countryid={countryid}
              onChange={(e) => {
                setSelectedCity(e.name); // Update the selected city
                setstateid(e.id);
              }}
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
              name="numberOfPeople"
              placeholder="Number of People"
              min="1"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <Select
              name="currency"
              placeholder="Select Currency"
              options={currencyOptions} // Define currency options
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
              name="numberOfActivity"
              placeholder="Number of Activities"
              min="1"
              className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="col-span-3">
            <select
              name="typeOfActivity"
              defaultValue=""
              className="select select-primary w-full max-w-xs block p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
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
            {result.activities.map((activity, index) => {
              return (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-bold">Day : {activity.day}</h3>
                  <div className="space-y-4">
                    {activity.activitiesOnDay.map((item) => {
                      return (
                        <div key={item.time}>
                          <div>Time : {item.time}</div>
                          <div>Activity : {item.activity}</div>
                          <div>Budget Per Person : {item.budgetPerPerson}</div>
                          <div>Total Budget : {item.totalBudget}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex space-x-4 mt-12">
            <button
              onClick={handleSaveTrip}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
            >
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
