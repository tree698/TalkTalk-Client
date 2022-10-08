import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import NewTweetForm from '../newTweetForm/newTweetForm';
import TweetCard from '../tweetCard/tweetCard';
import TweetUser from '../tweetUser/tweetUser';
import styles from './tweets.module.css';

const Tweets = ({ tweetService, onAllTweets, onMyTweets, username }) => {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    tweetService
      .getTweets(username)
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

  const onUsernameClick = (tweet) => navigate(`/talk/:${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <div>
      <TweetUser onAllTweets={onAllTweets} onMyTweets={onMyTweets} />
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
      <NewTweetForm tweetService={tweetService} onError={onError} />
    </div>
  );
};

export default Tweets;
