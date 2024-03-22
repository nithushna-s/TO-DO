
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);


  const handleUpdate = () => {
    setEditing(false);
    onUpdate(todo._id, editedText);
  };

  return (
    <div  className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleUpdate}>
            submit
                     </button>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <button onClick={() => setEditing(true)}>
            edite
          </button>
          <button onClick={() => onDelete(todo._id)}>
          Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
