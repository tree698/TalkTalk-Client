import React from 'react';
import { useParams } from 'react-router-dom';
import Tweets from '../tweets/tweets';
import styles from './myTweets.module.css';

const MyTweets = ({ tweetService }) => {
  const { username } = useParams();

  return (
    <div>
      <h1>My Tweets</h1>
      <Tweets tweetService={tweetService} username={username} />
    </div>
  );
};

export default MyTweets;
