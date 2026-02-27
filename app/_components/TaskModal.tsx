import { useState, ChangeEvent, FormEvent, useEffect, useMemo } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  column: Column;
  initialTask?: Task;
  onSubmit?: (task: TaskInput) => Promise<Task>;
}

export default function TaskModal({
  isOpen,
  closeModal,
  column,
  initialTask,
  onSubmit,
}: IProps) {
  const [formData, setFormData] = useState<TaskInput>(
    initialTask ?? {
      title: "",
      description: "",
      column,
      priority: "low",
    }
  );

  const isEdit = useMemo(
    () => Object.keys(initialTask ?? {}).length,
    [initialTask]
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit) await onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      column,
      priority: "low",
    });
    closeModal();
  };

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    } else {
      setFormData({
        title: "",
        description: "",
        column,
        priority: "low",
      });
    }
  }, [initialTask, column]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#000000bb] overflow-auto">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white border border-gray-300 rounded-md shadow-lg p-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {isEdit ? "Update Existing" : "Create New"} Task
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-900 rounded-md p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 grid-cols-2 py-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Task title"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe your task"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="column"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Column
                    </label>
                    <select
                      name="column"
                      id="column"
                      value={formData.column}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="backlog">Backlog</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="priority"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Priority
                    </label>
                    <select
                      name="priority"
                      id="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                  >
                    {isEdit ? "Update" : "Add"} Task
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
