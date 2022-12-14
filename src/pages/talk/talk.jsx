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
      <div className={styles.header}>
        <Header addHome={true} addUpload={true} />
      </div>

      <div className={styles.talk}>
        <div className={styles.selectedWork}>
          <SelectedWork selectedWork={selectedWork} />
        </div>
        <div className={styles.tweets}>
          <div className={styles.slectTweet}>
            <SelectTweet onAllTweets={onAllTweets} onMyTweets={onMyTweets} />
          </div>
          <div className={styles.tweet}>
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

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Talk;
