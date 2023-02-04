import React, { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useApiContext } from '../context/ApiContext';

export default function NewTweetForm() {
  const [tweet, setTweet] = useState('');
  const [error, setError] = useState('');

  const { tweetService } = useApiContext();
  const {
    state: { id, fileName, title, username, brush, description },
  } = useLocation();

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message"
        value={tweet}
        required
        autoFocus
        onChange={(e) => setTweet((prev) => e.target.value)}
      />
      <button type="submit">
        <FaRegPaperPlane />
      </button>
    </form>
  );
}
