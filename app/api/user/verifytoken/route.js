import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const { authorization } = req.headers;
    
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Invalid or missing token" }, { status: 401 });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "asdfghjkl");

    console.log("decodeddddddd", decoded);
    console.log("tokennnnnnnnnnnn", token);
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ msg: "verify token" }, { status: 201 });
}
