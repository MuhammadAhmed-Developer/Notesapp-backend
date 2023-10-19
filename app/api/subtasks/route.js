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
      

      const subtasks = await db.subGoal.findMany({
        where: {
         mainTaskid: id, 
        },
      });
  
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


  // Update the checked status of a subtask
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, checked } = body;

    const updatedSubtask = await db.subGoal.update({
      where: { id },
      data: { checked },
    });

    return NextResponse.json({ message: 'Subtask checked status updated', subtask: updatedSubtask }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating subtask checked status' }, { status: 500 });
  }
}



export async function DELETE(req) {
  try {
    const { id } = await req.json(); 

    await db.subGoal.delete({
      where: { id: Number(id) },
    });

   
    return NextResponse.json({ message: ' subtasks deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting  subtasks' }, { status: 500 });
  }
}

