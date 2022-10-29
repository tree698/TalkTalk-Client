import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ onAllWorks, onMyWorks }) => {
  return (
    <div className={styles.container}>
      <button className={styles.allworks} onClick={onAllWorks}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        All Works
      </button>
      <button className={styles.myworks} onClick={onMyWorks}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        My Works
      </button>
    </div>
  );
};

export default ActionBtn;
