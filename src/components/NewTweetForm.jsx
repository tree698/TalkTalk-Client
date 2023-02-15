import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';

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
      className="flex justify-between items-center mb-1 lg:mb-2 text:base md:text-lg lg:text-xl"
    >
      <input
        type="text"
        placeholder="Type a talk"
        value={tweet}
        required
        autoFocus
        onChange={(e) => setTweet((prev) => e.target.value)}
        className="w-full px-1 md:px-2 lg:px-3 my-3 py-1 md:py-2 lg:py-3 border-2 border-lightGray outline-none rounded-md placeholder:text-lightGray placeholder:italic shadow-lg placeholder:text-sm md:placeholder:text-lg lg:placeholder:text-xl"
      />
      <button
        type="submit"
        className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 flex justify-center items-center rounded-full ml-2 md:ml-3 text-lg md:text-xl lg:text-2xl text-white bg-lightGray hover:scale-110 hover:brightness-110 transition-all delay-150 duration-300 ease-in-out"
      >
        <FaPaperPlane className="" />
      </button>
    </form>
  );
}
