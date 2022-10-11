import React from 'react';
import styles from './selectTweet.module.css';

const SelectTweet = ({ onAllTweets, onMyTweets }) => {
  return (
    <div>
      <button onClick={onAllTweets}>All Tweets</button>
      <button onClick={onMyTweets}>My Tweets</button>
    </div>
  );
};

export default SelectTweet;
