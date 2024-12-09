import React, { useState } from "react";
import "../App.css";

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState("");

  const onInput = (e) => {
    setName(e.target.value);
  };

  const addTodo = () => {
    if (name === "") {
      alert(`タスクを入力して下さい。`);
      return;
    }

    setTodos([...todos, name]);
    setName(""); // 入力フィールドをクリア
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input type="text" value={name} onChange={onInput} />
      <button onClick={addTodo}>Add ToDo</button>
      <br />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="my-1">
              <span className="w-2/3 py-0.5 px-2 mx-2 bg-blue-100 rounded">
                {todo}
                <button onClick={() => removeTodo(index)}>&#65049;</button>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
