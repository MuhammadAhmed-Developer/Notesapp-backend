import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { iid, label, checked } = body;

    const newItem = await db.itemsList.create({
      data: {
        iid,
        label,
        checked,
      },
    });

    // console.log('New Item:', newItem);

    const serializedItem = {
        ...newItem,
        iid: newItem.iid.toString(), // Convert to string
      };

    // Send the created item in the JSON response
    return NextResponse.json({ message: 'Item added', item: serializedItem }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Item cannot be added' }, { status: 409 });
  }
}

