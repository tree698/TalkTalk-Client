import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import Avatar from './Avatar';
import Banner from './ui/Banner';

export default function UsersInConversation({ onAvatarClick }) {
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const { tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    tweetService
      .getTweets('', id)
      .then((tweets) => setTweets([...tweets]))
      .catch((error) => {
        setError((prev) => error.toString());
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  }, [tweetService]);

  return (
    <>
      <Banner text={error} />
      <ul>
        {tweets &&
          tweets.map((tweet) => (
            <button
              key={tweet.id}
              onClick={() => onAvatarClick(tweet.username)}
            >
              <Avatar photo={tweet.photo} username={tweet.username} />
            </button>
          ))}
      </ul>
    </>
  );
}
