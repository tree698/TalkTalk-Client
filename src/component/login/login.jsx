import React from 'react';
import { useState } from 'react';
import styles from './login.module.css';

const LogIn = ({ onLogIn, onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [text, setText] = useState('');
  // const [isAlert, setIsAlert] = useState(false);

  const onClick = () => {
    onSignUpClick();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onLogIn(username, password).catch(setError);
  };

  const setError = (error) => {
    // setText(error.toString());
    // setIsAlert(true);
    window.alert(error.toString());
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'username':
        return setUsername(value);
      case 'password':
        return setPassword(value);
      default:
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <div className={styles.signup__container}>
          <p className={styles.singupMessage}>Don't you have an account?</p>
          <button className={styles.signupBtn} onClick={onClick}>
            SIGN UP
          </button>
        </div>
        {/* {text && <p>{text}</p>} */}
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subTitle}>Login your account</p>
        <form className={styles.login__form} onSubmit={onSubmit}>
          <div className={styles.input__container}>
            <label for="username" className={styles.form__label}>
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              className={styles.form__input}
              placeholder="Your username"
              id="username"
              required
            />
            <br />
            <label for="password" className={styles.form__label}>
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className={styles.form__input}
              placeholder="Your password"
              id="password"
              required
            />
            <br />
          </div>
          <button className={styles.loginBtn} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
