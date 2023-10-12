// Import your Prisma client
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// Create a new main task
export async function POST(req) {
  try {
    const body = await req.json();
    const { label, checked } = body;
console.log(label, checked);
    const newMainTask = await db.mainTask.create({
      data: {
        label,
        checked,
      },
    });

    // Send the created main task in the JSON response
    return NextResponse.json({ message: 'Main task added', mainTask: newMainTask }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Main task cannot be added' }, { status: 409 });
  }
}

// Get all main tasks
export async function GET() {
  try {
    const mainTasks = await db.mainTask.findMany();
    return NextResponse.json(mainTasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching main tasks' }, { status: 500 });
  }
}

// // Create a new subtask for a main task
// export async function POST_subtask(req) {
//   try {
//     const { mainTaskId, label, checked } = await req.json();

//     const newSubtask = await db.subtask.create({
//       data: {
//         label,
//         checked,
//         mainTask: {
//           connect: {
//             id: mainTaskId,
//           },
//         },
//       },
//     });

//     // Send the created subtask in the JSON response
//     return NextResponse.json({ message: 'Subtask added', subtask: newSubtask }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Subtask cannot be added' }, { status: 409 });
//   }
// }

// // Get all subtasks for a main task
// export async function GET_subtasks(req) {
//   try {
//     const { mainTaskId } = req.query;
//     const subtasks = await db.subtask.findMany({
//       where: {
//         mainTaskId: parseInt(mainTaskId),
//       },
//     });
//     return NextResponse.json(subtasks, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: 'Error fetching subtasks' }, { status: 500 });
//   }
// }
