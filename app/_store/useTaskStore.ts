// store/useTaskUIStore.ts
import { create } from "zustand";

interface TaskState {
  search: string;
  setSearch: (value: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
}));
