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

// ToDoの型定義
type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState("");

    // ToDo追加
    const handleAdd = () => {
        if (!input.trim()) return;
        setTodos([
            ...todos,
            { id: Date.now(), text: input.trim(), completed: false },
        ]);
        setInput("");
    };

    // ToDo削除
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // 完了チェック
    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div
            className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-10`}
        >
            <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
                <div className="flex flex-col items-center w-full">
                    <Image
                        className="dark:invert mx-auto"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                    />
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center w-full">
                        ToDoアプリ
                    </h1>
                    <div className="flex flex-col items-center w-full">
                        <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full justify-center items-center">
                            <input
                                className="border rounded px-3 py-2 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-center"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="新しいToDoを入力..."
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleAdd()
                                }
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 w-32 text-center"
                                onClick={handleAdd}
                            >
                                追加
                            </button>
                        </div>
                    </div>
                </div>
                <ul className="w-full max-w-md">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-white dark:bg-gray-800 rounded shadow p-3 mb-2"
                        >
                            <label className="flex items-center gap-2 cursor-pointer w-full">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
                                />
                                <span
                                    className={
                                        todo.completed
                                            ? "line-through text-gray-400 dark:text-gray-600"
                                            : "text-gray-900 dark:text-gray-100"
                                    }
                                >
                                    {todo.text}
                                </span>
                            </label>
                            <button
                                className="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                onClick={() => handleDelete(todo.id)}
                            >
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
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
