
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');


  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3003/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await fetch('http://localhost:3003/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodoText }),
      });
      const newTodo = await response.json();

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, newText) => {
    try {
      const response = await fetch(`http://localhost:3003/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3003/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div >
      <div className="todo-list">
        <h1>Todo List</h1>
        <div className="add-todo">
          <input
            type="text"
            placeholder="Add new todo..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <TodoItem
              todo={todo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
