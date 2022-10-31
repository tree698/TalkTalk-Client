import React from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import AllTweets from '../../component/allTweets/allTweets';
import Footer from '../../component/footer/footer';
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
    navigate('/talk');
  };

  const onMyTweets = () => {
    navigate(`/talk/${user.username}`);
  };

  return (
    <div className={styles.container}>
      <Header addHome={true} addUpload={true} />

      <div className={styles.talk}>
        <div className={styles.selectedWork}>
          <SelectedWork selectedWork={selectedWork} />
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
        <div className={styles.tweet}>
          <SelectTweet onAllTweets={onAllTweets} onMyTweets={onMyTweets} />
          <Routes>
            <Route
              path="/"
              element={
                <AllTweets
                  tweetService={tweetService}
                  selectedWork={selectedWork}
                  onAllTweets={onAllTweets}
                />
              }
            />
            <Route
              path="/:username"
              element={
                <MyTweets
                  tweetService={tweetService}
                  selectedWork={selectedWork}
                  onMyTweets={onMyTweets}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Talk;
