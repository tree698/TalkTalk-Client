import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ onAllWorks, onMyWorks }) => {
  return (
    <div>
      {/* <h1>Action Btn</h1> */}
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
