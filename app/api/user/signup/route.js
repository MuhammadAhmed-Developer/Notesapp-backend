import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    // console.log(body);

    // Check if email already exits
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "UserEmail Already Exits" },
        { status: 409 }
      );
    }

    // Check if email already exits
    //   const existingUserByUsername = await db.user.findUnique({
    //     where:{username: username}
    //  })

    //  if(existingUserByUsername){
    //     return NextResponse.json({user:null, message:"UserName Already Exits"},{status: 409})
    //  }

    const hashPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    // const randomId = Math.random().splice(2)
    const token = jwt.sign({ email:email, iat:1 }, "asdfghjkl" );
    console.log(token,'token creadted');

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User Registered",  token:token },
      { status: 201 }
      
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error  User Not Created " },
      { status: 500 }
    );
  }
}
