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
    <div className="basis-1/2 flex flex-col px-10 md:px-12 lg:pl-8 lg:pr-0">
      <UsersInConversation tweets={tweets} onAvatarClick={handleAvatarClick} />

      <button
        className="w-full my-2 py-1 text-xs md:text-sm lg:text-base border border-superLightGray rounded-md hover:bg-slate500 hover:text-white hover:border-0 transition-all delay-150 duration-300 ease-in-out"
        onClick={() => setSelectedUsersname((prev) => undefined)}
      >
        <div className="flex items-center">
          <BsChevronRight className="ml-3 md:ml-5 lg:ml-7 mr-2 md:mr-3 lg:mr-5" />
          <p>All Talks</p>
        </div>
      </button>

      <div
        style={{ boxShadow: '7px 7px 5px 0px rgba(124,121,121,1)' }}
        className="flex-1 overflow-y-auto bg-talkBG bg-cover bg-no-repeat border border-superLightGray rounded-md overflow-hidden"
      >
        <ul className="h-96 p-1 md:p-2 lg:p-3">
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
            <div className="flex justify-center items-end gap-2 text-base md:text-xl lg:text-2xl font-bold mt-20 md:mt-28 lg:mt-36">
              <Banner text="No talk yet..." />
              <GiNothingToSay className="text-2xl md:text-4xl lg:text-5xl pb-2" />
            </div>
          )}
        </ul>
      </div>
      <NewTweetForm />
    </div>
  );
}
