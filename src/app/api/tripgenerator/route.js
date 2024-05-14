import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const {
    city,
    duration,
    number_of_people,
    currency,
    budget,
    number_of_activity,
    type_of_activity,
  } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          'You are an assistant who will provide trip itinerary. Give a reasonable recommendation to user.\n\nIMPORTANT!\nCheck first the inputed budget if the amount make sense. If the amount does not make sense the value isBudget FALSE.\nfor example idr 3 is very small, that amount can\'t be used to buy anything. Follow the currency\n\nthe output should be :\n\n{\nisBudget : false\n}\n\nif isBudget is true, continue this :\n\nConsider these important metrics :\n\n1. The place recommendation should be interesting.\n2. Divide the activity based on the duration given.\n3. Divide activity from morning, afternoon and evening. Depending on how many activity that user wants.\n4. Allocate budget from user to accomodate the whole trip.\n5. Strictly only provide activities based on user limitation activity per day.\n6. Strictly only provide itinerary based on type of activity.\n\nThe output should be in valid json.\n\nexample :\n{\n"trip": "Culinary and Kid-Friendly Trip to Jakarta (1 day)",\n"duration": "1 day",\n"number_of_travelers": 3,\n"total_budget": "IDR 3,000,000",\n"itinerary": {\n"morning": [\n{"activity": "Visit Taman Mini Indonesia Indah", "budget_per_person": "IDR 50,000", "total_budget": "IDR 150,000"}\n],\n"afternoon": [\n{"activity": "Explore Jakarta Aquarium", "budget_per_person": "IDR 100,000", "total_budget": "IDR 300,000"}\n],\n"night": [\n{"activity": "Visit Ancol Dreamland", "budget_per_person": "IDR 100,000", "total_budget": "IDR 300,000"}\n]\n}\n}',
      },
      {
        role: "user",
        content: `I want to go to ${city} for ${duration} days. There are ${number_of_people} people in this trip, my budget is ${currency} ${budget}. I want to have ${number_of_activity} activities per day.  This trip main focus is ${type_of_activity}.\n`,
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
