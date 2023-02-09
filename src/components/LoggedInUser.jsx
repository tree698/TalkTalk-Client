import React from 'react';
import Avatar from './Avatar';

export default function LoggedInUser({
  photo,
  username,
  styleForAvatar,
  styleForUsername,
  styleForLoggedInUser,
}) {
  return (
    <div className={styleForLoggedInUser}>
      <Avatar
        photo={photo}
        username={username}
        styleForAvatar={styleForAvatar}
      />
      <span className={styleForUsername}>{username}</span>
    </div>
  );
}
