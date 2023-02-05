import React from 'react';
import { formatAgo } from '../util/date';
import Avatar from './Avatar';

export default function TweetCard({ owner, tweet, onAvatarClick, onDelete }) {
  const { id, text, createdAt, userId, username, photo } = tweet;

  return (
    <li>
      <button onClick={() => onAvatarClick(username)}>
        <Avatar photo={photo} username={username} />
      </button>
      <div>
        <p>{username}</p>
        <p>{formatAgo(createdAt)}</p>
      </div>
      <p>{text}</p>
      {owner && (
        <div>
          <button onClick={() => onDelete(id)}>✅</button>
        </div>
      )}
    </li>
  );
}
