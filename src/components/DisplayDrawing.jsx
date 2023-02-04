import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DisplayDrawing({
  drawing,
  checkboxForDelete,
  toBeDeletedId,
}) {
  const { id, fileName, title, username, brush, description } = drawing;
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
      <button
        onClick={() =>
          navigate('/talk', {
            state: { id, fileName, title, username, brush, description },
          })
        }
      >
        <li>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
            alt={title}
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
