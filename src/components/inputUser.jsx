"use client";

import { useState, useRef } from "react";
// import Cookies from "js-cookie";
// import Link from "next/link";
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
  const [loading, setLoading] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function handleGenerateTrip(event) {
    event.preventDefault(); // Prevent default form submission
    setLoading(true);
    setValidationMessage("");
    const formData = new FormData(formRef.current);
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

    if (
      !selectedCountry ||
      !duration ||
      !numberOfPeople ||
      !currency ||
      !budget ||
      !numberOfActivity ||
      !typeOfActivity
    ) {
      setValidationMessage("Please fill in all the fields!");
      setLoading(false);
      return;
    }

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
    setLoading(false);
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

    if (res.ok) {
      setToastMessage("Trip saved successfully!"); // Set toast message
      setShowToast(true); // Show toast
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    } else {
      setToastMessage("Failed to save trip.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
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
      <form ref={formRef} onSubmit={handleGenerateTrip} className="space-y-4">
        {validationMessage && (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{validationMessage}</span>
          </div>
        )}
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
            placeHolder="Select State"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <input
            type="number"
            min="1"
            max="10"
            name="duration"
            placeholder="Duration (e.g., 3 days)"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />

          <input
            type="number"
            min="1"
            max="10"
            name="numberOfPeople"
            placeholder="Number of People"
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
            placeholder="Budget (e.g., 1000)"
            min="100"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />

          <input
            type="number"
            name="numberOfActivity"
            placeholder="Number of Activities"
            min="1"
            max="5"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />

          <Select
            name="typeOfActivity"
            placeholder="Select Activity"
            options={[
              { value: "Culinary", label: "Culinary" },
              { value: "History and Culture", label: "History and Culture" },
              { value: "Staycation", label: "Staycation" },
              { value: "Outdoor Activity", label: "Outdoor Activity" },
            ]}
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Generate My Trip
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      )}
      {result && (
        <div className="card w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="card-body bg-gray-100 p-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-4 flex justify-center items-center mb-6">
              <h3 className="text-xl font-bold text-center">{result.trip}</h3>
            </div>
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
        </div>
      )}
      {showToast && (
        <div className="toast toast-bottom toast-center">
          <div className="alert alert-success">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </main>
  );
};
