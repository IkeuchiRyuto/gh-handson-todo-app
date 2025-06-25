import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  // TODOリストの型
  type Todo = { id: number; text: string; done: boolean };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // ローカルストレージから読み込み
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // ローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 追加
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), done: false },
    ]);
    setInput("");
  };

  // 削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // 完了切替
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className="bg-white/80 shadow-xl rounded-2xl px-8 py-8 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-600 tracking-tight drop-shadow-sm">My TODO List</h1>
        <div className="flex gap-2 mb-6 w-full">
          <input
            className="flex-1 border-2 border-blue-200 focus:border-blue-400 rounded-l-xl px-4 py-2 text-lg outline-none bg-white/80 transition-all shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="やることを入力..."
          />
          <button
            className="bg-gradient-to-r from-blue-400 to-pink-400 text-white px-5 py-2 rounded-r-xl font-bold text-lg shadow hover:from-blue-500 hover:to-pink-500 transition-all"
            onClick={addTodo}
          >
            ＋
          </button>
        </div>
        <ul className="w-full flex flex-col gap-3">
          {todos.length === 0 && (
            <li className="text-gray-400 text-center py-8">TODOはありません</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between bg-white/90 rounded-xl shadow-md px-4 py-3 group transition-all border-2 ${todo.done ? "border-green-300" : "border-transparent"}`}
            >
              <button
                className={`mr-3 w-7 h-7 flex items-center justify-center rounded-full border-2 ${todo.done ? "border-green-400 bg-green-100" : "border-gray-300 bg-gray-100 hover:bg-blue-100"} transition-all`}
                onClick={() => toggleTodo(todo.id)}
                aria-label="完了切替"
              >
                {todo.done ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" fill="#4ade80" /><path d="M6 10.5l2.5 2.5L14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#a3a3a3" strokeWidth="2" fill="#fff" /></svg>
                )}
              </button>
              <span
                className={`flex-1 text-lg select-none ${todo.done ? "line-through text-gray-400" : "text-gray-800"}`}
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <button
                className="ml-3 p-1 rounded-full hover:bg-red-100 transition-colors"
                onClick={() => deleteTodo(todo.id)}
                aria-label="削除"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="5.5" y="8.5" width="9" height="7" rx="1.5" stroke="#f87171" strokeWidth="1.5" /><path d="M8 11v3M12 11v3" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" /><rect x="8" y="4" width="4" height="2" rx="1" fill="#f87171" /><path d="M7 6h6" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-8 text-gray-400 text-xs">© {new Date().getFullYear()} TODO App</footer>
    </div>
  );
}
