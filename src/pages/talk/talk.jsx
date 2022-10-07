import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AllTweets from '../../component/allTweets/allTweets';
import Header from '../../component/header/header';
import MyTweets from '../../component/myTweets/myTweets';
import SelectedWork from '../../component/selectedWork/selectedWork';
import { useAuth } from '../../context/authContext';
import styles from './talk.module.css';

const Talk = ({ selectedWork, tweetService }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onAllTweets = () => {
    navigate('/talk');
  };

  const onMyTweets = () => {
    navigate(`/talk/:${user.username}`);
  };

  return (
    <div className={styles.talk}>
      <Header addHome={true} addUpload={true} />
      <SelectedWork selectedWork={selectedWork} />

      <Routes>
        <Route
          path="/"
          element={
            <AllTweets tweetService={tweetService} onAllTweets={onAllTweets} />
          }
        />
        <Route
          path="/:username"
          element={
            <MyTweets tweetService={tweetService} onMyTweets={onMyTweets} />
          }
        />
      </Routes>
    </div>
  );
};

export default Talk;
