import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try {
        const body = await req.json()
        const {id} = body

        const deleteitem = await db.itemsList.delete({
            where:{
                id:id
            }
        })
        return NextResponse.json({message:'Item Deleted'})
     }
    catch (error) {
        return NextResponse.json({message:'Item cannot deleted Deleted'})
        
    }
}