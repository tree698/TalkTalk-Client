import React from 'react';
import SelectedWork from '../../component/selectedWork/selectedWork';
import Tweets from '../../component/tweets/tweets';

import styles from './talk.module.css';

const Talk = ({ selectedWork }) => {
  return (
    <div className={styles.talk}>
      <SelectedWork selectedWork={selectedWork} />
      <Tweets />
    </div>
  );
};

export default Talk;
