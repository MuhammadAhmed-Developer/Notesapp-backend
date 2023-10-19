import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"
export const revalidate = 20
export async function GET(req) {
  try {
    const checkedItems = await db.itemsList.findMany({
      where: {
        checked: true,
      },
    });

    const checkedItemsStringified = checkedItems.map(item => {
      const stringifiedItem = { ...item };
      for (const key in stringifiedItem) {
        if (typeof stringifiedItem[key] === 'bigint') {
          stringifiedItem[key] = stringifiedItem[key].toString();
        }
      }
      return stringifiedItem;
    });


    return NextResponse.json({ checkedItems: checkedItemsStringified }, { status: 200 });
  } catch (error) {
    console.error("Error getting checked items", error);
    return NextResponse.json({ message: 'Failed to get checked items' }, { status: 500 });
  }
}
