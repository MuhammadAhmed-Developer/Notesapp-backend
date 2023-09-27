import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(req) {
    try {
        const body = await req.json()
        const { email, password } = body;
       

        // Check if email already exits
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        })

        if (!existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Invalid Credentials" }, { status: 409 })
        }
        
       const isMatch =  await bcrypt.compare(password, existingUserByEmail.password)
       if(!isMatch){
            return NextResponse.json({message:"Password can't match"}, {status: 409})
       }

        return NextResponse.json(existingUserByEmail, { message: "User Login" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error  User Not Login " }, { status: 500 })
    }

}