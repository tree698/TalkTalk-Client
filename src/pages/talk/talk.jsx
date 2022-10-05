import React from 'react';
import Header from '../../component/header/header';
import SelectedWork from '../../component/selectedWork/selectedWork';
import Tweets from '../../component/tweets/tweets';

import styles from './talk.module.css';

const Talk = ({ selectedWork, tweetService }) => {
  return (
    <div className={styles.talk}>
      <Header addHome={true} addUpload={true} />
      <SelectedWork selectedWork={selectedWork} />
      <Tweets tweetService={tweetService} />
    </div>
  );
};

export default Talk;
