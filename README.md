# Kanban Task Board

A responsive Kanban-style task board built with **Next.js**, **React Query**, **Zustand**, and **Tailwind CSS**.  
Features include task creation, update, deletion, dynamic filtering by search, column grouping, and React Query caching with optional persistence.

---

## Features

- Fetch tasks from a mock API (`/api/tasks`)
- Add, update, and delete tasks
- Filter tasks by **title** or **description**
- Columns: **To Do**, **In Progress**, **In Review**, **Done**
- Scrollable columns with dynamic height
- React Query caching for fast state management
- Responsive and clean design with Tailwind CSS

---

## Tech Stack

- **Next.js 16+ (App Router)**
- **React Query (@tanstack/react-query)**
- **Zustand** (for search and UI state)
- **Tailwind CSS** (utility-first styling)
- **TypeScript**
- **JSON file** as mock backend (`/data/tasks.json`)

---

## Folder Structure

├─ app/
│ ├─ layout.tsx
│ ├─ page.tsx
│ └─ components/
│ ├─ Board.tsx
│ ├─ TaskContainer.tsx
│ ├─ TaskCard.tsx
│ ├─ AddTask.tsx
│ └─ Navbar.tsx
├─ \_hooks/
│ └─ useTasks.ts
├─ \_services/
│ └─ tasks.api.ts
├─ store/
│ └─ useTaskUIStore.ts
├─ data/
│ └─ tasks.json
├─ lib/
│ └─ reactQueryClient.ts
├─ package.json
└─ README.md

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/MuhannedHelall/todo-kanban.git
cd kanban-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start dev server

```bash
npm run dev
```

### 4. Open in your browser

Open http://localhost:3000 in your browser.

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start development server     |
| `npm run build` | Build project for production |
| `npm run start` | Start production server      |
| `npm run lint`  | Run linter                   |

## Notes

1. This project uses a JSON file (tasks.json) as a mock backend. No database is required.
2. React Query handles caching, invalidation, and synchronization of tasks.
3. Zustand manages UI state like search filters.
