import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import Banner from '../banner/banner';
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

    // const tweetBox = document.querySelector('#tweets');
    // console.log(tweetBox.getBoundingClientRect());
    // console.log(tweetBox.clientHeight);
    // tweetBox.scrollTo(0, tweetBox.clientHeight);
    // tweetBox.scrollTo(0, 0);
  };

  // const onDelete = (tweetId) => {
  //   tweetService
  //     .deleteTweet(tweetId)
  //     .then(() =>
  //       setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
  //     )
  //     .catch((error) => setError(error.toString()));
  // };

  const onUsernameClick = (tweet) => navigate(`/talk/${tweet.username}`);

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <Banner text={error} />

      {tweets.length === 0 && (
        <h2 className={styles.message}>No Messages Yet ...</h2>
      )}

      <ul className={styles.tweets} id="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            // onDelete={onDelete}
            onUsernameClick={onUsernameClick}
          />
        ))}
      </ul>

      <div className={styles.newTweetForm}>
        <NewTweetForm
          tweetService={tweetService}
          onError={onError}
          selectedWork={selectedWork}
        />
      </div>
    </div>
  );
};

export default Tweets;
