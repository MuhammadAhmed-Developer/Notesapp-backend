import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, oldemail } = body;

    const user = await db.user.update({
      where: { email: oldemail },
      data: {
        name: name,
        email: email,
      },
    });


    return NextResponse.json({ message: "Profile Updated" },{ status: 201 });
  } catch (error) {
    console.error("Error:", error);

    return NextResponse.json({ message: "Profile Could Not Be Updated" }, { status: 500 });
  }
}
