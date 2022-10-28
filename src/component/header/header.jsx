import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from './header.module.css';

const Header = ({ addHome, addUpload }) => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const onGoToHome = () => {
    navigate('/');
  };

  const onGoToUpload = () => {
    navigate('/upload');
  };

  const onLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logOut();
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <img className={styles.logo} src="logo.png" alt="" />
        {addHome && (
          <button className={styles.btn} onClick={onGoToHome}>
            Home
          </button>
        )}
        {addUpload && (
          <button className={styles.btn} onClick={onGoToUpload}>
            Upload
          </button>
        )}
      </div>
      <button className={styles.logoutBtn} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
