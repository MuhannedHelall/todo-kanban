import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";
import TaskModal from "./TaskModal";

const colors: Record<Priority, string> = {
  high: "text-red-700 bg-red-200",
  medium: "text-orange-700 bg-orange-200",
  low: "text-gray-700 bg-gray-200",
};

interface IProps {
  task: Task;
  onUpdate?: (task: TaskInput) => Promise<Task>;
  onDelete?: (id: number) => Promise<void>;
}

export default function TaskCard({ task, onUpdate, onDelete }: IProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <>
      <div
        className="relative bg-white rounded-lg shadow cursor-pointer border border-gray-300 p-2"
        onClick={() => setOpen(true)}
      >
        <div
          className="cursor-grab mb-1 p-1 bg-gray-100 rounded"
          ref={setNodeRef}
          style={style}
          {...listeners}
          {...attributes}
        >
          <h2 className="font-mono text-base font-bold capitalize">
            {task.title}
          </h2>
        </div>
        <p className="text-sm text-gray-600 my-1">{task.description}</p>
        <span
          className={`text-sm font-mono uppercase px-2 py-1 rounded ${
            colors[task.priority]
          }`}
        >
          {task.priority}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(task.id);
          }}
          className="absolute top-2 right-4 text-red-600 hover:scale-105 cursor-pointer"
        >
          x
        </span>
      </div>

      <TaskModal
        isOpen={isOpen}
        closeModal={() => setOpen(false)}
        column={task.column}
        initialTask={task}
        onSubmit={onUpdate}
      />
    </>
  );
}
