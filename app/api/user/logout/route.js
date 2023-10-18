import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    
    const { token } = await req.json();

    const decodedToken = jwt.verify(token, "asdfghjkl");
     const {email} = decodedToken
   

    return NextResponse.json({ message: "User logged out" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token or error logging out" }, { status: 401 });
  }
}
