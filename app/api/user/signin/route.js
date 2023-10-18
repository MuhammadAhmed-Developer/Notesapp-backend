import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
var jwt = require('jsonwebtoken');

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

       

       
       const token = jwt.sign({ email:email, iat:1 }, "asdfghjkl" , {expiresIn: "30d"});


        return NextResponse.json({existingUserByEmail, message: "User Login" , token:token}, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error  User Not Login " }, { status: 500 })
    }

}


