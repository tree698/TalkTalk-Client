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
    <div>
      {addHome && <button onClick={onGoToHome}>home</button>}
      {addUpload && <button onClick={onGoToUpload}>upload</button>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Header;
