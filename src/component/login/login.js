import React from 'react';
import { useState } from 'react';
import styles from './login.module.css';

const LogIn = ({ onLogIn, onSignUpClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const onClick = () => {
    !isAlert && onSignUpClick();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onLogIn(username, password).catch(setError);
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
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
    <div className={styles.login}>
      <p className={styles.singup}>Don't you have an account?</p>
      <button className={styles.signupBtn} onClick={onClick}>
        SIGN UP
      </button>
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subTitle}>Login you account</p>
      <form className={styles.login_form} onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          className={styles.form_input}
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          className={styles.form_input}
          placeholder="password"
          required
        />
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
