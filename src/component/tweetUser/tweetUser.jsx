import React from 'react';
import styles from './tweetUser.module.css';

const TweetUser = ({ onAllTweets, onMyTweets }) => {
  return (
    <div>
      <button onClick={onAllTweets}>All Tweets</button>
      <button onClick={onMyTweets}>My Tweets</button>
    </div>
  );
};

export default TweetUser;
