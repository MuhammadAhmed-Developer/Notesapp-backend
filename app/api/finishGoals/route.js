import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
export const revalidate = 20
export async function GET() {
  try {
    const checkedMain = await db.mainTask.findMany({
      where: {
        checked: true,
      },
    });
    const checkedsub = await db.subGoal.findMany({
      where: {
        checked: true,
      },
    });

   
    return NextResponse.json({ checkedMain: checkedMain, checkedsub: checkedsub }, { status: 200 });
  } catch (error) {
    console.error("Error getting checked items", error);
    return NextResponse.json({ message: 'Failed to get checked items' }, { status: 500 });
  }
}
