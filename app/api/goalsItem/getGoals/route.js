import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const items = await db.itemsListGoals.findMany();
console.log(items);
console.log(items);
console.log(items);
console.log(items);
    const itemsWithStrings = items.map(item => ({
      ...item,
      iid: item.iid.toString(),
    }));
    // dlfjjjjjj

    return NextResponse.json({ items: itemsWithStrings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error retrieving items' }, { status: 500 });
  }
}
