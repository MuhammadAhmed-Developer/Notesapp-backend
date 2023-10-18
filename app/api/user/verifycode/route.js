import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST (req){
    try {
        const  body  = await req.json();
        const {verifyCode} = body;

        const verifyUserCode = await db.user.findUnique({
            where:{verifyKey:verifyCode}
        }) 

        if(!verifyUserCode){
     return NextResponse.json({message:"code Not MAtced"}, {status:409})

        }

     return NextResponse.json({message:"code MAtced"}, {status:201})
    } catch (error) {
     return NextResponse.json({message:"code not Matched"}, {status:500})
        
    }

}