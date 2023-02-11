import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';
import toast from 'react-hot-toast';

export default function NewTweetForm() {
  const [tweet, setTweet] = useState('');
  const [error, setError] = useState('');

  const { tweetService } = useApiContext();
  const {
    state: { id },
  } = useLocation();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    tweetService
      .createTweet(tweet, id)
      .then((created) => {
        setTweet('');
      })
      .catch((error) => {
        setError((prev) => error.toString());
        setTimeout(() => {
          setError('');
        }, 10000);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center mb-2 text-xl"
    >
      <input
        type="text"
        placeholder="Type a talk"
        value={tweet}
        required
        autoFocus
        onChange={(e) => setTweet((prev) => e.target.value)}
        className="w-full px-3 my-3 py-3 border-2 border-lightGray outline-none rounded-md placeholder:text-lightGray placeholder:italic shadow-lg"
      />
      <button
        type="submit"
        className="w-12 h-12 flex justify-center items-center rounded-full ml-3 text-2xl text-white bg-lightGray hover:scale-110 hover:brightness-110 transition-all delay-150 duration-300 ease-in-out"
      >
        <FaPaperPlane className="" />
      </button>
    </form>
  );
}
