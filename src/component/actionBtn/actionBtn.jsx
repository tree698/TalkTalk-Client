import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ onSendSearchTerm, onAllWorks, onMyWorks }) => {
  return (
    <div>
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
