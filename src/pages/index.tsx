import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([input, ...todos]);
    setInput("");
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col items-center justify-center bg-background text-foreground`}
    >
      <main className="w-full max-w-md mx-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center mb-2">Todoアプリ</h1>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 text-black dark:text-white bg-gray-100 dark:bg-gray-800 focus:outline-none"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="新しいTodoを入力..."
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={addTodo}
          >
            追加
          </button>
        </div>
        <ul className="space-y-2">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center">Todoはありません</li>
          )}
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between bg-gray-50 dark:bg-gray-900 px-3 py-2 rounded"
            >
              <span>{todo}</span>
              <button
                className="text-red-500 hover:text-red-700 text-xs ml-2"
                onClick={() => removeTodo(idx)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
