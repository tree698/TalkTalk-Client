import React from 'react';

export default function Avatar({ photo, username }) {
  return (
    <div>
      {!!photo ? (
        <img
          style={{ width: '100px', borderRadius: '50%' }}
          src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${photo}`}
        />
      ) : (
        <div>{username.charAt(0)}</div>
      )}
    </div>
  );
}
