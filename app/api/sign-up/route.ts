import AirTable, { type Record } from "airtable";
import { NextResponse } from "next/server";

const base = new AirTable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "appfkjYpNQxFZs0Qe"
);

export async function POST(request: Request, response: Response) {
  const req = await request.json();
  console.log(req);

  if (!base) {
    throw new Error("AIRTABLE_API_KEY is not defined");
  }

  try {
    const { email, phoneModel, previousCustomer, newToCrypto } = req;

    const record = base("Kokio Beta Signups").create({
      Email: email,
      "Phone Brand and Model": phoneModel,
      "Used eSIM Before": previousCustomer,
      "New to Crypto": newToCrypto,
    });

    const data = await record;
    if (!data) {
      throw new Error("Failed to create record");
    }
    return NextResponse.json({ id: data.getId() });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
