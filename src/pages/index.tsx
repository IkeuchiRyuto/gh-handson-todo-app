  import { useState, FormEvent, ChangeEvent } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false },
    ]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Todoアプリ</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="新しいタスクを入力"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          追加
        </button>
      </form>
      <ul className="w-full max-w-md">
        {todos.length === 0 && <li className="text-gray-400">タスクはありません</li>}
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-white rounded shadow p-2 mb-2"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="accent-blue-500"
              />
              <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
            </label>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:underline text-sm"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
