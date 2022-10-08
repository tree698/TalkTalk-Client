import React from 'react';
import Avatar from '../avartar/avatar';
import parseDate from '../../util/date';
import styles from './tweetCard.module.css';

const TweetCard = ({ tweet, owner, onDelete, onUsernameClick }) => {
  const { id, text, createdAt, userId, username, photo } = tweet;

  return (
    <li>
      <section>
        <Avatar photo={photo} username={username} />
        <div>
          <span onClick={() => onUsernameClick(tweet)}>{username}</span>
          <span> · {parseDate(createdAt)}</span>
          <p>{text}</p>
        </div>
      </section>
      {owner && (
        <div>
          <button onClick={() => onDelete(id)}>x</button>
        </div>
      )}
    </li>
  );
};

export default TweetCard;
