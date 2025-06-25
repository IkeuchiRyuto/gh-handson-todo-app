import { useState } from "react";

// タスク型定義
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // タスク追加
  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  // タスク削除
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 完了チェック切替
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10">
      <h1 className="text-2xl font-bold mb-6">タスク管理アプリ</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border rounded px-3 py-2 w-64"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="タスクを入力..."
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTask}
        >
          追加
        </button>
      </div>
      <ul className="w-full max-w-md space-y-2">
        {tasks.length === 0 && (
          <li className="text-gray-400 text-center">タスクはありません</li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white rounded shadow px-4 py-2"
          >
            <label className="flex items-center gap-2 cursor-pointer w-full">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="accent-blue-500"
              />
              <span
                className={
                  task.completed ? "line-through text-gray-400" : ""
                }
              >
                {task.text}
              </span>
            </label>
            <button
              className="ml-4 text-red-500 hover:text-red-700"
              onClick={() => deleteTask(task.id)}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
