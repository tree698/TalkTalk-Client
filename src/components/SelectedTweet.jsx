import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import Banner from './ui/Banner';
import UsersInConversation from './UsersInConversation';
import { BsChevronRight } from 'react-icons/bs';

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
    <div className="basis-1/2 h-full flex flex-col ml-8">
      <Banner text={error} />
      <UsersInConversation tweets={tweets} onAvatarClick={handleAvatarClick} />
      <button
        className="w-full my-3 text-xl text-center py-3 border border-superLightGray rounded-md shadow-inner hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        onClick={() => setSelectedUsersname((prev) => undefined)}
      >
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-5" />
          <p>All Talks</p>
        </div>
      </button>

      {tweets.length === 0 && <h2>No Messages Yet ...</h2>}
      <ul className="flex-1 p-8 bg-signupLoginBG shadow-lg">
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
      <NewTweetForm />
    </div>
  );
}
