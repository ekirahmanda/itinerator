export default async function Page() {
  const itineraries = await getAllItineraryByUserId();
  console.log(itineraries);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">All My Itineraries</h1>
          <Link href="/create">
            <button className="mt-4 btn btn-primary">Create Itinerary</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="card bg-base-100 shadow-xl">
              <div className="card-body flex flex-col justify-between">
                <div>
                  <h2 className="card-title">Trip: {itinerary.trip}</h2>
                  {itinerary.activities &&
                    itinerary.activities.map((activity, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-bold">Day {index + 1}</h3>
                        <div className="space-y-2">
                          {activity.activitiesOnDay.map((item, i) => (
                            <div key={i} className="border rounded p-2">
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
                <div className="card-actions justify-end">
                  <Link href={`/public/${itinerary.id}`}>
                    <button className="btn btn-secondary">Share</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
