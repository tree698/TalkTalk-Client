import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ addDeleteBtn, onAllWorks, onMyWorks }) => {
  const onDelete = () => {};

  return (
    <div>
      {addDeleteBtn && <button onClick={onDelete}>Delete</button>}
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
