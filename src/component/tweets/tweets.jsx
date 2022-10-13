import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import NewTweetForm from '../newTweetForm/newTweetForm';
import TweetCard from '../tweetCard/tweetCard';
import styles from './tweets.module.css';

const Tweets = ({ tweetService, username, selectedWork }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    selectedWork &&
      tweetService
        .getTweets(username, selectedWork.id)
        .then((tweets) => setTweets([...tweets]))
        .catch(onError);

    const stopSync = tweetService.onSync((tweet) => onCreated(tweet));
    return () => stopSync();
  }, [tweetService, username, user]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const onDelete = (tweetId) => {
    tweetService
      .deleteTweet(tweetId)
      .then(() =>
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
      )
      .catch((error) => setError(error.toString()));
  };

  const onUsernameClick = (tweet) => navigate(`/talk/${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {tweets.length === 0 && <p>No Tweets Yet</p>}
      <ul>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onDelete={onDelete}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>
      <NewTweetForm
        tweetService={tweetService}
        onError={onError}
        selectedWork={selectedWork}
      />
    </div>
  );
};

export default Tweets;
