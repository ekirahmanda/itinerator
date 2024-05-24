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
    return <div>itinerary Not found</div>;
  }

  return (
    <div>
      <div>{data.trip}</div>
      <div>{data.duration}</div>
      <div>{data.numberOfTravelers}</div>
      <div>{data.totalBudget}</div>
      <div>
        {data.activities.map((activity) => {
          return (
            <div key={activity.id} className="space-y-4">
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
    </div>
  );
}
