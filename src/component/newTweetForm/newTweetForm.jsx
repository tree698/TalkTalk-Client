import React from 'react';
import { useState } from 'react';
import styles from './newTweetForm.module.css';

const NewTweetForm = ({ tweetService, onError, selectedWork }) => {
  const [tweet, setTweet] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    selectedWork &&
      tweetService
        .createTweet(tweet, selectedWork.id)
        .then((created) => {
          setTweet('');
        })
        .catch(onError);
  };

  const onChange = (event) => {
    setTweet(event.target.value);
  };

  return (
    <form action="" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter your talk"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default NewTweetForm;
