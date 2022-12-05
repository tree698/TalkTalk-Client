import React from 'react';
import Avatar from '../avartar/avatar';
import parseDate from '../../util/date';
import styles from './tweetCard.module.css';

const TweetCard = ({ tweet, owner, onDelete, onUsernameClick }) => {
  const { id, text, createdAt, userId, username, photo } = tweet;

  return (
    <div className={owner ? `${styles.owner}` : undefined}>
      <li className={styles.container}>
        <section className={styles.tweetCard}>
          <div className={owner ? `${styles.photoOrder}` : undefined}>
            <Avatar photo={photo} username={username} />
          </div>
          <div className={owner ? `${styles.tweetOwner}` : `${styles.tweet}`}>
            <div className={styles.nameAndTime}>
              <button
                className={
                  owner
                    ? `${styles.name} ${styles.colorOwner}`
                    : `${styles.name}`
                }
                onClick={() => onUsernameClick(tweet)}
              >
                {username}
              </button>
              <p
                className={
                  owner
                    ? `${styles.time} ${styles.colorOwner}`
                    : `${styles.time}`
                }
              >
                {parseDate(createdAt)}
              </p>
            </div>
            <p
              className={
                owner ? `${styles.text} ${styles.colorOwner}` : `${styles.text}`
              }
            >
              {text}
            </p>
          </div>
        </section>
        {/* {owner && (
          <div>
            <button onClick={() => onDelete(id)}>x</button>
          </div>
        )} */}
      </li>
    </div>
  );
};

export default TweetCard;
