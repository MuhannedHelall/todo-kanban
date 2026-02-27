"use client";

import { useTasks } from "../_hooks/useTasks";
import TaskContainer from "./TaskContainer";
import Image from "next/image";
import TaskContainerSkelton from "./TaskContainerSkelton";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Board() {
  const {
    groupedTasks,
    filteredCount,
    data,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  async function handleDelete(id: number) {
    const res = confirm("Are you sure you want to delete this task?");
    if (res) await deleteTask(id);
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null); // clear overlay when drag ends

    if (!over) return;

    const taskId = active.id as number;
    const newColumn = over.id as Column;

    // find the dragged task
    const task = data.find((t) => t.id === taskId);
    if (!task) return;

    // don't update if same column
    if (task.column === newColumn) return;

    // call your existing mutation
    await updateTask({
      ...task,
      column: newColumn,
    });
  };

  if (error) return <div>Something went wrong</div>;

  return (
    <main className="p-5 h-[calc(100vh-65px)]">
      {isLoading ? (
        <div className="grid grid-cols-4 gap-x-4 h-full">
          <TaskContainerSkelton />
          <TaskContainerSkelton />
          <TaskContainerSkelton />
          <TaskContainerSkelton />
        </div>
      ) : filteredCount ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
          <DndContext
            collisionDetection={closestCorners}
            onDragStart={(event) => {
              const task = data.find((t) => t.id === event.active.id);
              setActiveTask(task ?? null);
            }}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveTask(null)}
          >
            {!!groupedTasks.backlog.length && (
              <TaskContainer
                column="backlog"
                tasks={groupedTasks.backlog}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={handleDelete}
              />
            )}
            {!!groupedTasks.in_progress.length && (
              <TaskContainer
                column="in_progress"
                tasks={groupedTasks.in_progress}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={handleDelete}
              />
            )}
            {!!groupedTasks.review.length && (
              <TaskContainer
                column="review"
                tasks={groupedTasks.review}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={handleDelete}
              />
            )}
            {!!groupedTasks.done.length && (
              <TaskContainer
                column="done"
                tasks={groupedTasks.done}
                onAdd={addTask}
                onUpdate={updateTask}
                onDelete={handleDelete}
              />
            )}
            <DragOverlay>
              {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <div className="h-full flex flex-col gap-4 items-center justify-center">
          <Image
            src={"/noTasks.png"}
            alt="not found"
            width={200}
            height={200}
            style={{ width: "auto", height: "auto" }}
          />
          <span className="capitalize text-3xl font-mono">
            No Tasks found !
          </span>
        </div>
      )}
    </main>
  );
}
