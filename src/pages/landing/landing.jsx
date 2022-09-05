import React from 'react';
import { useState } from 'react';
import Heading from '../../component/heading/heading';
import Login from '../../component/login/login';
import Signup from '../../component/signup/signup';
import styles from './landing.module.css';

const Landing = ({ onSignUp, onLogin }) => {
  const [signup, setSignup] = useState(false);

  const onSignUpClick = () => {
    setSignup(true);
  };
  return (
    <div className={styles.landing}>
      <Heading />
      {signup ? (
        <Signup onSignUp={onSignUp} />
      ) : (
        <Login onLogin={onLogin} onSignUpClick={onSignUpClick} />
      )}
    </div>
  );
};

export default Landing;
