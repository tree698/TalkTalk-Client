import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styles from './actionBtn.module.css';

const ActionBtn = ({ onAllWorks, onMyWorks }) => {
  return (
    <div className={styles.container}>
      <button className={styles.works} onClick={onAllWorks}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        All Paintings
      </button>
      <button className={styles.works} onClick={onMyWorks}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        My Paintings
      </button>
    </div>
  );
};

export default ActionBtn;
