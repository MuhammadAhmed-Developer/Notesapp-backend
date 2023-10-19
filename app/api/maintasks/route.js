import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
export const revalidate = 20

// Create a new main task
export async function POST(req) {
  try {
    const body = await req.json();
    const { label, checked } = body;
    const newMainTask = await db.mainTask.create({
      data: {
        label,
        checked,
      },
    });

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


// Update the checked status of a main task
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, checked } = body;
    
    const updatedMainTask = await db.mainTask.update({
      where: { id:id },
      data: { checked:checked },
    });

    return NextResponse.json({ message: 'Main task checked status updated', mainTask: updatedMainTask, subTast: updatedsubTask }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error updating main task checked status' }, { status: 500 });
  }
}



// Delete a main task by ID

export async function DELETE(req) {
  try {
    const { id } = await req.json(); 
    await db.subGoal.deleteMany({
      where: { mainTaskid: Number(id) },
    });

    await db.mainTask.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Main task and its subtasks deleted' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error deleting main task and its subtasks' }, { status: 500 });
  }
}
