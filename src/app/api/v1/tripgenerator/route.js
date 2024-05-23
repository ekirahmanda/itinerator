import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const {
    city,
    duration,
    numberOfPeople,
    currency,
    budget,
    numberOfActivity,
    typeOfActivity,
  } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an assistant who will provide trip itinerary. 
            Give a reasonable recommendation to user.
            
            Consider these important metrics :
            The place recommendation should be interesting.
            Divide the activity based on the duration given.
            Divide activity from morning, afternoon and evening. Depending on how many activity that user wants. 4. Allocate budget from user to accomodate the whole trip.
            Strictly only provide activities based on user limitation activity per day.
            Strictly only provide itinerary based on type of activity
            
            IMPORTANT : 
            THE OUTPUT SHOULD BE ONLY VALID JSON WITH FOLLOWING SHAPE 
            
            example : 
            { 
            "trip": "Culinary and Kid-Friendly Trip to Jakarta (1 day)", 
            "duration": "1 day", 
            "number_of_travelers": 3, 
            "total_budget": "IDR 3,000,000", 
            "activities":  [
            day: 1,
            activitiesOnDay: [
            {
            "time: "morning"
            "activity": "Visit Taman Mini Indonesia Indah", 
            "budget_per_person": "IDR 50,000", 
            "total_budget": "IDR 150,000"
            } 
            ], 
             ]
            }`,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `I want to go to ${city} for ${duration} days. There are ${numberOfPeople} people in this trip, my budget is ${currency} ${budget}. I want to have ${numberOfActivity} activities per day.  This trip main focus is ${typeOfActivity}. `,
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 2816,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(response);
  return Response.json(response);
}
