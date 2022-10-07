import React from 'react';
import Tweets from '../tweets/tweets';
import styles from './allTweets.module.css';

const AllTweets = ({ tweetService, onAllTweets }) => {
  return (
    <div>
      <h1>All Tweets</h1>
      <Tweets tweetService={tweetService} onAllTweets={onAllTweets} />
    </div>
  );
};

export default AllTweets;
