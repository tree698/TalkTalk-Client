import React from 'react';
import { useParams } from 'react-router-dom';
import Tweets from '../tweets/tweets';
import styles from './myTweets.module.css';

const MyTweets = ({ tweetService, selectedWork }) => {
  const { username } = useParams();

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Tweets
          tweetService={tweetService}
          username={username}
          selectedWork={selectedWork}
        />
      </div>
    </div>
  );
};

export default MyTweets;
