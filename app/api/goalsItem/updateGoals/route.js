import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();
    const { iid, checked } = body;
    console.log(iid, checked);

    const updatedItem = await db.itemsListGoals.update({
      where: { id:iid },
      data: { checked:checked },
    });

    const serializedItem = {
      ...updatedItem,
      iid: updatedItem.iid.toString(), // Convert to string
    };

    return NextResponse.json({ message: 'Item updated', item: serializedItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Item cannot be updated' }, { status: 409 });
  }
}
