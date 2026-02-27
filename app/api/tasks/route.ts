import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tasks.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  const tasks = JSON.parse(data);
  return new Response(JSON.stringify({ tasks }), { status: 200 });
}

export async function POST(req: Request) {
  const newTask = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  const tasks = JSON.parse(data);

  newTask.id = tasks.length ? Math.max(...tasks.map((t: Task) => t.id)) + 1 : 1;
  tasks.push(newTask);

  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  return new Response(JSON.stringify(newTask), { status: 201 });
}

export async function PUT(req: Request) {
  const updatedTask = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  let tasks = JSON.parse(data);

  tasks = tasks.map((t: Task) => (t.id === updatedTask.id ? updatedTask : t));

  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  return new Response(JSON.stringify(updatedTask), { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  let tasks = JSON.parse(data);

  tasks = tasks.filter((t: Task) => t.id !== id);

  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
  return new Response(null, { status: 204 });
}
