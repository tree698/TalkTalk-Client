import React from 'react';
import { useState } from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ addDeleteBtn, onAllWorks, onMyWorks }) => {
  const [onDelete, setOnDelete] = useState(true);

  return (
    <div>
      <button onClick={onAllWorks}>All Works</button>
      <button onClick={onMyWorks}>My Works</button>
    </div>
  );
};

export default ActionBtn;
