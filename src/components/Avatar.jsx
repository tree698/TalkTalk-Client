import React from 'react';

export default function Avatar({ photo, username, styleForAvatar }) {
  return (
    <div>
      {!!photo ? (
        <img
          className={styleForAvatar}
          src={`${process.env.REACT_APP_BASE_URL}/uploaded_images/${photo}`}
        />
      ) : (
        <div className="flex justify-center items-center w-8 h-8 bg-brand text-white text-xl rounded-full mr-2">
          {username.charAt(0)}
        </div>
      )}
    </div>
  );
}
