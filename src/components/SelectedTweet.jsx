import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import Banner from './ui/Banner';

export default function SelectedTweet() {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const { user, tweetService } = useApiContext();
  const {
    state: { id, fileName, title, username, brush, description },
  } = useLocation();

  const username2 = '';

  useEffect(() => {
    id &&
      tweetService
        .getTweets(username2, id)
        .then((tweets) => setTweets([...tweets]))
        .catch((error) => {
          setError((prev) => error.toString());
          setTimeout(() => {
            setError('');
          }, 10000);
        });

    const stopSync = tweetService.onSync((tweet) => onCreated(tweet));
    return () => stopSync();
  }, [tweetService, user]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  return (
    <div>
      <Banner text={error} />
      {tweets.length === 0 && <h2>No Messages Yet ...</h2>}
      <ul id="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
          />
        ))}
      </ul>

      <div>
        <NewTweetForm />
      </div>
    </div>
  );
}
