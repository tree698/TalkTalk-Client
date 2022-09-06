import React from 'react';
import { useState } from 'react';
import styles from './signup.module.css';

const SignUp = ({ onSignUp, onLogInClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [url, setURL] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const onClick = () => {
    !isAlert && onLogInClick();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    onSignUp(username, password, email, url).catch(setError);
    !isAlert && onLogInClick();
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
      case 'email':
        return setEmail(value);
      case 'url':
        return setURL(value);
      default:
    }
  };
  return (
    <div className={styles.signup}>
      <h1 className={styles.title}>Create an account</h1>
      <form className={styles.signup_form} onSubmit={onSubmit}>
        <input
          name="username"
          type="text"
          value={username}
          onChange={onChange}
          className={styles.form_input}
          placeholder="username"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          className={styles.form_input}
          placeholder="password"
          required
        />
        <input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          className={styles.form_input}
          placeholder="email"
          required
        />
        <input
          name="url"
          type="text"
          value={url}
          onChange={onChange}
          className={styles.form_input}
          placeholder="image url (optional)"
        />
        <button className={styles.loginBtn} type="submit">
          Create account
        </button>
      </form>
      <p>Already have an account?</p>
      <button onClick={onClick}>Log in</button>
    </div>
  );
};

export default SignUp;
