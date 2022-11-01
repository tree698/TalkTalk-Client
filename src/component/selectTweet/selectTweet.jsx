import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './selectTweet.module.css';

const SelectTweet = ({ onAllTweets, onMyTweets }) => {
  return (
    <div className={styles.container}>
      <button className={styles.allTweets} onClick={onAllTweets}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        All Messages
      </button>
      <button className={styles.myTweets} onClick={onMyTweets}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        My Messages
      </button>
    </div>
  );
};

export default SelectTweet;
