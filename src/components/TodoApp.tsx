import React, { useState } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
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
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee' }}>
      <h2>ToDoアプリ</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力"
          style={{ flex: 1, padding: 8, color: '#000' }}
        />
        <button onClick={handleAdd} style={{ padding: '8px 16px' }}>追加</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              style={{ marginRight: 8 }}
            />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: 8, color: '#000' }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
