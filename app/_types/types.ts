type TaskInput = Omit<Task, "id"> & { id?: number };
