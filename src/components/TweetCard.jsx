import React from 'react';
import { formatAgo } from '../util/date';
import Avatar from './Avatar';

export default function TweetCard({ owner, tweet }) {
  const { id, text, createdAt, userId, username, photo } = tweet;

  return (
    <li>
      <div>
        <Avatar photo={photo} username={username} />
      </div>
      <div>
        <p>{username}</p>
        <p>{formatAgo(createdAt)}</p>
      </div>
      <p>{text}</p>
    </li>
  );
}
