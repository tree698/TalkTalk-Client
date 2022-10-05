import React from 'react';
import SearchFeature from '../searchFeature/searchFeature';
import styles from './actionBtn.module.css';

const ActionBtn = ({ onSendSearchTerm, onAllWorks, onMyWorks }) => {
  return (
    <div>
      <SearchFeature onSendSearchTerm={onSendSearchTerm} />
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
