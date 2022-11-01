import React from 'react';
import Tweets from '../tweets/tweets';
import styles from './allTweets.module.css';

const AllTweets = ({ tweetService, selectedWork }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Tweets tweetService={tweetService} selectedWork={selectedWork} />
      </div>
    </div>
  );
};

export default AllTweets;
