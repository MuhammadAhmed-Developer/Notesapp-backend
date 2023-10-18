import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
export const dynamic = "force-dynamic"
export const revalidate = 20
export async function POST(req) {
  try {
    const body = await req.json();
    const { label, checked, id } = body;
    const idofmain = id; 

    const newSubtask = await db.subGoal.create({
      data: {
        label,
        checked,
        mainGoal: {
          connect: {
            id: idofmain,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Subtask added', subtask: newSubtask },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Subtask cannot be added' }, { status: 409 });
  }
}


  // Get all subtasks for a main task
  export async function GET(request) {
    try {

      const url = new URL(request.url);
      const searchParams = new URLSearchParams(url.search);
      let id = searchParams.get('id')
        id = Number(id)
      // id = Number(id)
      
      console.log('iddddddddddddddddddddddddddddd',id);

      const subtasks = await db.subGoal.findMany({
        where: {
         mainTaskid: id, 
        },
      });
  
      console.log('Subtasks:', subtasks);
      return new Response(JSON.stringify(subtasks), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: 'Error fetching subtasks' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }