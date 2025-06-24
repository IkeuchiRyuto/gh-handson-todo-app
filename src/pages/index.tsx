import React, { useState, ChangeEvent, FormEvent } from "react";

// Todo型定義
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  // Todoリストの状態
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力欄の状態
  const [input, setInput] = useState("");

  // 追加処理
  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  // 削除処理
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 完了チェック切り替え
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <section className="w-full max-w-md bg-white rounded shadow p-8">
        <h2 className="text-xl font-bold mb-6 text-center">Todoリスト</h2>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            className="flex-1 border rounded px-2 py-1"
            placeholder="新しいタスクを入力..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            追加
          </button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="accent-blue-500"
              />
              <span
                className={
                  "flex-1 " +
                  (todo.completed ? "line-through text-gray-400" : "")
                }
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:underline"
                aria-label="削除"
              >
                削除
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
