import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { label, checked, id } = body;
    const idofmain = id; // Since id is the ID of the MainTask

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
  export async function GET(req) {
    try {
      const subtasks = await db.subtask.findMany();
      console.log('AAAAAAA',subtasks);
      return NextResponse.json(subtasks, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error fetching subtasks' }, { status: 500 });
    }
  }
