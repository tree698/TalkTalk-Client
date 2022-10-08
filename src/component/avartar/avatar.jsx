import React from 'react';

const Avatar = ({ photo, username }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <div>
      {!!photo ? (
        <img
          style={{ width: '30px' }}
          src={`${baseURL}/uploaded_images/${photo}`}
        />
      ) : (
        <div>{username.charAt(0)}</div>
      )}
    </div>
  );
};

export default Avatar;
