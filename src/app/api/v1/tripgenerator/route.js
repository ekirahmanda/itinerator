import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { city, duration, numberOfPeople, currency, budget, numberOfActivity, typeOfActivity } = await req.json();
  console.log({ city, duration, numberOfPeople, currency, budget, numberOfActivity, typeOfActivity });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            text: 'You are an assistant who will provide trip itinerary. \nGive a reasonable recommendation to user.\n\nConsider these important metrics :\nThe place recommendation should be interesting.\nDivide the activity based on the duration given.\nDivide activity from morning, afternoon and evening. Depending on how many activity that user wants. 4. Allocate budget from user to accomodate the whole trip.\nStrictly only provide activities based on user limitation activity per day.\nStrictly only provide itinerary based on type of activity\n\nIMPORTANT : \nTHE OUTPUT SHOULD BE ONLY VALID JSON WITH FOLLOWING SHAPE \n\nexample : \n{ \n"trip": "Culinary and Kid-Friendly Trip to Jakarta (1 day)", \n"duration": "1 day", \n"numberOfTravelers": 3, \n"totalBudget": "IDR 3,000,000", \n"activities":  [\nday: 1,\nactivitiesOnDay: [\n{\n"time: "morning"\n"activity": "Visit Taman Mini Indonesia Indah", \n"budgetPerPerson": "IDR 50,000", \n"totalBudget": "IDR 150,000"\n} \n], \n ]\n}\n\nIMPORTANT, do not include ```json',
            type: "text",
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

  return Response.json(response);
}
