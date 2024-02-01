// src/components/TodoItem.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const fade = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleUpdate = () => {
    setEditing(false);
    onUpdate(todo._id, editedText);
  };

  return (
    <animated.div style={fade} className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleUpdate}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => setEditing(true)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onDelete(todo._id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </animated.div>
  );
};

export default TodoItem;
