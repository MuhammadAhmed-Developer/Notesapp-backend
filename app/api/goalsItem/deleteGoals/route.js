import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try {
        const body = await req.json()
        const {id} = body
        console.log(id);

        const deleteitem = await db.itemsListGoals.delete({
            where:{
                id:id
            }
        })
            console.log(deleteitem);
        return NextResponse.json({message:'Item Deleted'})
     }
    catch (error) {
        console.log(error);
        return NextResponse.json({message:'Item cannot deleted Deleted'})
        
    }
}