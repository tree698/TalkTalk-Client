import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiMailSend } from 'react-icons/bi';
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
      className="flex justify-between mt-3 md:mt-4 lg:mt-5 border border-superLightGray rounded-md overflow-hidden shadow-inner"
    >
      <input
        type="text"
        data-testid="input-tweet"
        placeholder="Type a talk"
        value={tweet}
        required
        autoFocus
        onChange={(e) => setTweet((prev) => e.target.value)}
        className="w-full px-2 py-1 md:py-2 outline-none placeholder:text-lightGray placeholder:italic placeholder:text-xs md:placeholder:text-sm lg:placeholder:text-base"
      />
      <button
        type="submit"
        data-testid="submit-tweet"
        className="text-xl md:text-2xl lg:text-3xl px-1 md:px-2 lg:px-3"
      >
        <BiMailSend className="text-lightGray hover:text-slate500 hover:scale-105" />
      </button>
    </form>
  );
}
