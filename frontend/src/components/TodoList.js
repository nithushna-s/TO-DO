// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');

  const fade = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3001/todos');
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
      const response = await fetch('http://localhost:3001/todos', {
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
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
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
      await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <animated.div style={fade}>
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
    </animated.div>
  );
};

export default TodoList;