import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
    <form action="" onSubmit={onSubmit} className={styles.container}>
      <input
        type="text"
        placeholder="Type a message"
        value={tweet}
        required
        autoFocus
        onChange={onChange}
        className={styles.input}
      />
      <button className={styles.post} type="submit">
        <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} />
      </button>
    </form>
  );
};

export default NewTweetForm;
