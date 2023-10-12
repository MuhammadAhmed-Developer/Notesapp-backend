import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Retrieve all items from the database
    const items = await db.itemsListGoals.findMany();

    // Convert BigInt values to strings in the retrieved items
    const itemsWithStrings = items.map(item => ({
      ...item,
      iid: item.iid.toString(),
    }));

    // Send the items with BigInt values converted to strings in the JSON response
    return NextResponse.json({ items: itemsWithStrings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error retrieving items' }, { status: 500 });
  }
}
