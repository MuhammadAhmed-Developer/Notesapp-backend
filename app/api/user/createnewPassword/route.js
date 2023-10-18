import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
export async function POST (req){
    try {
        const body = await req.json();
        const {password, verifyCode} = body;
        const hashPassword = await hash(password, 10);

        const user = await db.user.update({
            where: {verifyKey: verifyCode},
            data: {
                password: hashPassword
            }
        })

    
        return NextResponse.json({message: 'Password Updated'},{status:201})
    } catch (error) {
        return NextResponse.json({message: 'Password Cannot updated'},{status:500})
        
    }
}