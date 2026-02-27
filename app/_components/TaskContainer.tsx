import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

const colors: Record<string, string> = {
  backlog: "bg-sky-500",
  in_progress: "bg-orange-500",
  review: "bg-purple-500",
  done: "bg-green-500",
};

const displayName: Record<Column, String> = {
  backlog: "To Do",
  in_progress: "in progress",
  review: "in review",
  done: "done",
};

interface IProps {
  column: Column;
  tasks: Task[];
  onAdd: (task: Omit<Task, "id">) => Promise<Task>;
  onUpdate: (task: TaskInput) => Promise<Task>;
  onDelete: (id: number) => Promise<void>;
}

export default function TaskContainer({
  column,
  tasks,
  onAdd,
  onUpdate,
  onDelete,
}: IProps) {
  const { setNodeRef } = useDroppable({ id: column });
  return (
    <div
      ref={setNodeRef}
      className="bg-gray-200 rounded-xl flex flex-col gap-2 p-4 h-full overflow-y-auto overflow-x-hidden"
    >
      <div className="flex items-center gap-x-4 font-mono">
        <div className={`rounded-full ${colors[column]} w-2 h-2`} />
        <span className="uppercase">{displayName[column]}</span>
        <span className="bg-gray-300 rounded-full px-2">{tasks.length}</span>
      </div>

      {tasks?.map((task: Task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}

      <AddTask column={column} onSubmit={onAdd} />
    </div>
  );
}
