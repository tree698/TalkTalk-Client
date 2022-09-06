import React from 'react';
import { useState } from 'react';
import Heading from '../../component/heading/heading';
import LogIn from '../../component/login/login';
import SignUp from '../../component/signup/signup';
import styles from './landing.module.css';

const Landing = ({ onSignUp, onLogIn }) => {
  const [signUp, setSignUp] = useState(false);

  const onLogInClick = () => {
    setSignUp(false);
  };
  const onSignUpClick = () => {
    setSignUp(true);
  };
  return (
    <div className={styles.landing}>
      <Heading />
      {signUp ? (
        <SignUp onSignUp={onSignUp} onLogInClick={onLogInClick} />
      ) : (
        <LogIn onLogIn={onLogIn} onSignUpClick={onSignUpClick} />
      )}
    </div>
  );
};

export default Landing;
