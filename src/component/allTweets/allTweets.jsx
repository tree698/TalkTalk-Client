import React from 'react';
import Tweets from '../tweets/tweets';
import styles from './allTweets.module.css';

const AllTweets = ({ tweetService, selectedWork }) => {
  return (
    <div>
      <h1>All Tweets</h1>
      <Tweets tweetService={tweetService} selectedWork={selectedWork} />
    </div>
  );
};

export default AllTweets;
