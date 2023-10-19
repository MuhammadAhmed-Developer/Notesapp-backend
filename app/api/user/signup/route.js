import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "UserEmail Already Exits" },
        { status: 409 }
      );
    }


    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });



    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User Registered",   },
      { status: 201 }
      
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error  User Not Created " },
      { status: 500 }
    );
  }
}
