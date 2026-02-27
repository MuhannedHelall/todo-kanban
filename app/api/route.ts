import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/* =========================
   Types
========================= */

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
};

/* =========================
   Global Store
========================= */

declare global {
  // eslint-disable-next-line no-var
  var tasksStore: Task[] | undefined;
  // eslint-disable-next-line no-var
  var idCounter: number | undefined;
  // eslint-disable-next-line no-var
  var isInitialized: boolean | undefined;
}

/* =========================
   File Path
========================= */

const filePath = path.join(process.cwd(), "data", "tasks.json");

/* =========================
   Initialize From File (Once)
========================= */

async function initializeData() {
  if (global.isInitialized) return;

  try {
    const file = await fs.readFile(filePath, "utf-8");
    const parsed: Task[] = JSON.parse(file);

    global.tasksStore = parsed;
    global.idCounter =
      parsed.length > 0 ? Math.max(...parsed.map((t) => t.id)) + 1 : 1;

    global.isInitialized = true;

    console.log("Tasks loaded from JSON file");
  } catch (error) {
    console.warn("No tasks.json found, starting empty");
    global.tasksStore = [];
    global.idCounter = 1;
    global.isInitialized = true;
  }
}

/* =========================
   GET
========================= */

export async function GET() {
  try {
    await initializeData();

    return NextResponse.json({ tasks: global.tasksStore }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

/* =========================
   POST
========================= */

export async function POST(req: Request) {
  try {
    await initializeData();

    const body = await req.json();

    const newTask: Task = {
      ...body,
      id: global.idCounter ?? 1,
    };

    global.idCounter = (global.idCounter ?? 1) + 1;

    global.tasksStore?.push(newTask);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}

/* =========================
   PUT
========================= */

export async function PUT(req: Request) {
  try {
    await initializeData();

    const updatedTask: Task = await req.json();

    const index =
      global.tasksStore?.findIndex((t) => t.id === updatedTask.id) ?? -1;

    if (index === -1) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    global.tasksStore![index] = updatedTask;

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

/* =========================
   DELETE
========================= */

export async function DELETE(req: Request) {
  try {
    await initializeData();

    const { id } = await req.json();

    global.tasksStore = global.tasksStore?.filter((t) => t.id !== id);

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}
