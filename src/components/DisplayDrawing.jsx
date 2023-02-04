import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayDrawing({
  drawing,
  checkboxForDelete,
  toBeDeletedId,
}) {
  const { id, fileName, title, username } = drawing;
  const navigate = useNavigate();

  return (
    <>
      {checkboxForDelete && (
        <input
          name="delete"
          id="delete"
          onChange={() => toBeDeletedId(id)}
          type="checkbox"
        />
      )}
      <button onClick={() => navigate('/talk', { state: { drawing } })}>
        <li>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
            alt={drawing.title}
          />
          <div>
            <p>{title}</p>
            <p>By {username}</p>
          </div>
        </li>
      </button>
    </>
  );
}
