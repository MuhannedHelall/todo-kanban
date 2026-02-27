// components/TaskModal.tsx
import { useState } from "react";
import TaskModal from "./TaskModal";

interface IProps {
  column: Column;
  onSubmit: (task: Omit<Task, "id">) => Promise<Task>;
}

export default function AddTask({ column, onSubmit }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="border border-dashed border-gray-400 rounded-xl px-4 py-1 cursor-pointer"
      >
        + Add Task
      </button>

      <TaskModal
        isOpen={isOpen}
        closeModal={closeModal}
        column={column}
        onSubmit={onSubmit}
      />
    </>
  );
}
