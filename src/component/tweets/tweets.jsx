import React from 'react';
import NewTweetForm from '../newTweetForm/newTweetForm';
import TweetCard from '../tweetCard/tweetCard';
import TweetUser from '../tweetUser/tweetUser';
import styles from './tweets.module.css';

const Tweets = ({ tweetService }) => {
  return (
    <div>
      <TweetUser />
      <TweetCard />
      <NewTweetForm />
    </div>
  );
};

export default Tweets;
