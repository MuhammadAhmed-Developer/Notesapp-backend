  // Import your Prisma client
  import { db } from "@/lib/db";
  import { NextResponse } from "next/server";

  // Create a new subtask for a main task
  export async function POST(req) {
    try {
      const {  label, checked, id } = await req.json();

      const val = Object.keys(id);
      const idofmain =  val.pop()

      console.log('bengoo is also in server',Object.keys(id));
      console.log('bengoo is also in server',(idofmain));

      const newSubtask = await db.subtask.create({
        data: {
          label,
          checked,
          mainTask: {
            connect: {
              id: idofmain,
            },
          },
        },
      });

      // Send the created subtask in the JSON response
      return NextResponse.json({ message: 'Subtask added', subtask: newSubtask }, { status: 201 });
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
