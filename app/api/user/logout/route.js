import { NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    // Assuming you receive the token in the request body
    const { token } = await req.json();

    // Verify and decode the token to ensure its validity
    const decodedToken = jwt.verify(token, "asdfghjkl");
     const {email} = decodedToken
    // Instead of deleting user data, you can simply invalidate the token
    // You can use a blacklist or some other mechanism to handle token invalidation
    // For this example, we'll simulate invalidation by not returning any data

    return NextResponse.json({ message: "User logged out" }, { status: 200 });
  } catch (error) {
    // Handle errors, such as invalid tokens or database errors
    return NextResponse.json({ message: "Invalid token or error logging out" }, { status: 401 });
  }
}
