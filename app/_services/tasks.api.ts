const API_URL = "/api";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.tasks;
}

export async function addTask(task: Omit<Task, "id">): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(task: TaskInput): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(API_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
}
