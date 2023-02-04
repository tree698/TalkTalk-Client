import React from 'react';
import { useLocation } from 'react-router-dom';

export default function SelectedDrawing() {
  const {
    state: { fileName, title, username, brush, description },
  } = useLocation();

  return (
    <div>
      <img
        src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${fileName}`}
        alt={title}
      />
      <ul>
        <li>
          <span>Titl: {title}</span>
        </li>
        <li>
          <span>Username: {username}</span>
        </li>
        <li>
          <span>Brush: {brush}</span>
        </li>
        <li>
          <span>Say something: {description}</span>
        </li>
      </ul>
    </div>
  );
}
