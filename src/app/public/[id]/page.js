import { Footer } from "@/components/footer";
async function getData(id) {
  const res = await fetch(
    `https://itinerator-gamma.vercel.app/api/v1/generated/${id}`
  );
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const data = await getData(params.id);

  if (!data) {
    return <div className="text-center text-red-500">Itinerary Not Found</div>;
  }

  return (
    <div>
      <main className="flex flex-col min-h-screen bg-gray-100 p-4">
        <div className="card bg-base-100 shadow-xl p-6 mb-6">
          <div className="card-body">
            <div className="flex justify-center mb-4">
              <h2 className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md p-4 flex justify-center card-title">
                {data.trip}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 className="font-semibold">Duration</h3>
                <p>{data.duration}</p>
              </div>
              <div>
                <h3 className="font-semibold">Number of Travelers</h3>
                <p>{data.numberOfTravelers}</p>
              </div>
              <div>
                <h3 className="font-semibold">Total Budget</h3>
                <p>{data.totalBudget}</p>
              </div>
            </div>
            <div>
              {data.activities.map((activity) => (
                <div key={activity.id} className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Day: {activity.day}
                  </h3>
                  <div className="space-y-4">
                    {activity.activitiesOnDay.map((item) => (
                      <div
                        key={item.time}
                        className="p-4 border rounded-lg bg-white"
                      >
                        <div>
                          <span className="font-semibold">Time:</span>{" "}
                          {item.time}
                        </div>
                        <div>
                          <span className="font-semibold">Activity:</span>{" "}
                          {item.activity}
                        </div>
                        <div>
                          <span className="font-semibold">
                            Budget Per Person:
                          </span>{" "}
                          {item.budgetPerPerson}
                        </div>
                        <div>
                          <span className="font-semibold">Total Budget:</span>{" "}
                          {item.totalBudget}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
