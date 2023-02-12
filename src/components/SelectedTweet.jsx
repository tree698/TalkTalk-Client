import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsChevronRight } from 'react-icons/bs';
import { GiNothingToSay } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import NewTweetForm from './NewTweetForm';
import TweetCard from './TweetCard';
import UsersInConversation from './UsersInConversation';
import Banner from './ui/Banner';

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
  }, [id, tweetService, user, selectedUsername]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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
    <div id="whole" className="basis-1/2 flex flex-col ml-8">
      <UsersInConversation tweets={tweets} onAvatarClick={handleAvatarClick} />
      <button
        className="w-full my-3 text-xl text-center py-3 text-darkLightGray border-2 border-superLightGray rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all delay-150 duration-300 ease-in-out"
        onClick={() => setSelectedUsersname((prev) => undefined)}
      >
        <div className="flex items-center">
          <BsChevronRight className="ml-7 mr-5" />
          <p>All Talks</p>
        </div>
      </button>
      <ul className="h-[60vh] p-8 bg-talkBG bg-cover bg-no-repeat shadow-lg overflow-y-scroll">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            owner={tweet.username === user.username}
            onAvatarClick={handleAvatarClick}
            onDelete={handleDelete}
          />
        ))}
        {tweets.length === 0 && (
          <div className="flex justify-center items-end gap-2 text-2xl">
            <Banner text="No talk yet..." />
            <GiNothingToSay className="text-6xl pb-2 text-lightGray" />
          </div>
        )}
      </ul>
      <NewTweetForm />
    </div>
  );
}
