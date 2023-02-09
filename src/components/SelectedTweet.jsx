import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import Banner from './ui/Banner';
import Button from './ui/Button';
import UsersInConversation from './UsersInConversation';

export default function SelectedTweet() {
  const [tweets, setTweets] = useState([]);
  const [selectedUsername, setSelectedUsersname] = useState(undefined);
  const [error, setError] = useState('');

  const { user, tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    id &&
      tweetService
        .getTweets(selectedUsername, id)
        .then((tweets) => setTweets([...tweets]))
        .catch((error) => {
          setError((prev) => error.toString());
          setTimeout(() => {
            setError('');
          }, 3000);
        });

    const stopSync = tweetService.onSync((tweet) => onCreated(tweet));
    return () => stopSync();
  }, [tweetService, user, selectedUsername]);

  const onCreated = (tweet) => {
    setTweets((tweets) => [tweet, ...tweets]);
  };

  const handleDelete = (tweetId) => {
    tweetService
      .deleteTweet(tweetId)
      .then(() =>
        setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId))
      )
      .catch((error) => setError(error.toString()));
  };

  const handleAvatarClick = (username) => {
    setSelectedUsersname((prev) => username);
  };

  return (
    <div className="basis-2/5">
      <Banner text={error} />
      <UsersInConversation tweets={tweets} onAvatarClick={handleAvatarClick} />
      <Button
        text="All Talks"
        onClick={() => setSelectedUsersname((prev) => undefined)}
      />
      {tweets.length === 0 && <h2>No Messages Yet ...</h2>}
      <ul id="tweets">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onAvatarClick={handleAvatarClick}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <div>
        <NewTweetForm />
      </div>
    </div>
  );
}
