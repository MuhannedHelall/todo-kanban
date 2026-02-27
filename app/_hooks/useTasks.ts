import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "../_services/tasks.api";
import { useMemo } from "react";
import { useTaskStore } from "../_store/useTaskStore";

export function useTasks() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: api.getTasks,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const addTask = useMutation({
    mutationFn: api.addTask,
    onSuccess: invalidate,
  });

  const updateTask = useMutation({
    mutationFn: api.updateTask,
    onSuccess: invalidate,
  });

  const deleteTask = useMutation({
    mutationFn: api.deleteTask,
    onSuccess: invalidate,
  });

  const tasks = query.data ?? [];
  const search = useTaskStore((state) => state.search);

  // Filtered tasks with the search term coming from the search input in the Navbar component.
  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const term = search.toLowerCase().trim();
        return (
          task.title.toLowerCase().includes(term) ||
          task.description.toLowerCase().includes(term)
        );
      }),
    [tasks, search]
  );

  // Grouping the tasks into 4 main categories as presented.
  const groupedTasks = useMemo(() => {
    const groups: Record<Column, Task[]> = {
      backlog: [],
      in_progress: [],
      review: [],
      done: [],
    };

    filteredTasks.forEach((task: Task) => {
      groups[task.column].push(task);
    });

    return groups;
  }, [filteredTasks]);

  return {
    ...query,
    data: tasks,
    groupedTasks,
    totalCount: tasks.length,
    filteredCount: filteredTasks.length,
    addTask: addTask.mutateAsync,
    updateTask: updateTask.mutateAsync,
    deleteTask: deleteTask.mutateAsync,
  };
}
