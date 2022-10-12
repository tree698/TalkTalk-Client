import React from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AllTweets from '../../component/allTweets/allTweets';
import Header from '../../component/header/header';
import MyTweets from '../../component/myTweets/myTweets';
import SelectedWork from '../../component/selectedWork/selectedWork';
import SelectTweet from '../../component/selectTweet/selectTweet';
import { useAuth } from '../../context/authContext';
import styles from './talk.module.css';

const Talk = ({ selectedWork, tweetService }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const onAllTweets = () => {
    console.log('yes');
    navigate('/talk');
  };

  const onMyTweets = () => {
    console.log('yes');
    console.log(user.username);
    navigate(`/talk/${user.username}`);
  };

  return (
    <div className={styles.talk}>
      <Header addHome={true} addUpload={true} />
      <SelectedWork selectedWork={selectedWork} />

      <SelectTweet onAllTweets={onAllTweets} onMyTweets={onMyTweets} />

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
