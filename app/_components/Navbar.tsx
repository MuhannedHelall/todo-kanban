"use client";

import Image from "next/image";
import { useTasks } from "../_hooks/useTasks";
import { useTaskStore } from "../_store/useTaskStore";

export default function Navbar() {
  const { search, setSearch } = useTaskStore();
  const { data } = useTasks();

  return (
    <nav className="border-b border-gray-300 py-2 px-5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-2">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={40}
          height={40}
          loading="eager"
        />

        <div className="flex flex-col">
          <h1 className="uppercase font-bold">Kanban Board</h1>
          <h4 className="">{data?.length} tasks</h4>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="search tasks..."
          className="p-1.5 rounded-md bg-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </nav>
  );
}
