import React, { useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

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

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([input, ...todos]);
    setInput("");
  };

  const handleDelete = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todoアプリ</h1>
        <form onSubmit={handleAdd} className="flex gap-2 w-full">
          <input
            className="flex-1 border rounded px-2 py-1 text-black"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="タスクを入力..."
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            追加
          </button>
        </form>
        <ul className="w-full mt-4 space-y-2">
          {todos.length === 0 && (
            <li className="text-gray-400">タスクはありません</li>
          )}
          {todos.map((todo, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-white/80 dark:bg-black/30 rounded px-3 py-2 shadow"
            >
              <span>{todo}</span>
              <button
                onClick={() => handleDelete(idx)}
                className="text-red-500 hover:underline text-sm"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
