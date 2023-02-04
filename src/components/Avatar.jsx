import React from 'react';

export default function Avatar({ photo, username }) {
  return (
    <div>
      {!!photo ? (
        <img
          src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${photo}`}
        />
      ) : (
        <div>{username.charAt(0)}</div>
      )}
    </div>
  );
}
