import React from 'react';
import { useState } from 'react';
import Banner from '../banner/banner';
import FileUpload from '../fileUpload/fileUpload';
import styles from './signup.module.css';

const SignUp = ({ onSignUp, onLogInClick, workService }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [text, setText] = useState('');

  const onClick = () => {
    onLogInClick();
  };

  // user를 받아 오면 then을 사용하요 login으로 이동
  const onSubmit = (event) => {
    event.preventDefault();
    onSignUp(username, password, email, photo)
      .then((user) => onLogInClick())
      .catch(setError);
  };

  const setError = (error) => {
    setText(error.toString());
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
      default:
    }
  };

  const liftFile = (file) => {
    setPhoto(file.fileName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <h1 className={styles.title}>Create an account</h1>
        <Banner text={text} />
        <form className={styles.signup_form} onSubmit={onSubmit}>
          <input
            name="username"
            type="text"
            value={username}
            onChange={onChange}
            className={styles.form__input}
            placeholder="Username"
            required
          />
          <input
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            className={styles.form__input}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={password}
            onChange={onChange}
            className={styles.form__input}
            placeholder="Password"
            required
          />
          <input
            name="photo"
            disabled={true}
            className={styles.form__input__photo}
            placeholder="Photo (* optional)"
          />

          <div className={styles.display}>
            <div className={styles.fileUpload__wrap}>
              <FileUpload workService={workService} liftFile={liftFile} />
            </div>
            {photo && (
              <p className={styles.message}>
                Successfully uploaded your photo!
              </p>
            )}
          </div>

          <button className={styles.signupBtn} type="submit">
            Create account
          </button>
        </form>
        <div className={styles.login__container}>
          <p>Already have an account?</p>
          <button className={styles.loginBtn} onClick={onClick}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
