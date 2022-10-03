import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({
  addDeleteBtn,
  onAllWorks,
  onMyWorks,
  onClickDeleteBtn,
}) => {
  return (
    <div>
      {addDeleteBtn && <button onClick={onClickDeleteBtn}>Delete</button>}
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
