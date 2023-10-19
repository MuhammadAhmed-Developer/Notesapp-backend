import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"
export const revalidate = 20
export async function GET(req) {
  try {
    const items = await db.itemsList.findMany();

    const itemsWithStrings = items.map(item => ({
      ...item,
      iid: item.iid.toString(),
    }));

    return NextResponse.json({ items: itemsWithStrings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error retrieving items' }, { status: 500 });
  }
}
