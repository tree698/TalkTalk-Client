import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './upload.module.css';

const Upload = ({ workService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brush, setBrush] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const navigate = useNavigate();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'description':
        return setDescription(value);
      case 'brush':
        return setBrush(value);
      case 'image':
        return setImage(value);
      default:
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    workService //
      .createWork(title, description, brush, image)
      .catch(setError);
    navigate('/');
  };

  const setError = (error) => {
    setText(error.toString());
    setIsAlert(true);
  };

  return (
    <div>
      <h1>Upload Page</h1>
      {text && <p>{text}</p>}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className={styles.title}
          placeholder="title"
          required
        />
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          className={styles.description}
          cols="30"
          rows="5"
          placeholder="description"
        ></textarea>
        <input
          type="text"
          name="brush"
          value={brush}
          onChange={onChange}
          className={styles.brush}
          placeholder="brush"
        />
        {/* test 후 삭제 => react-dropzone */}
        <input
          type="text"
          name="image"
          value={image}
          onChange={onChange}
          className={styles.image}
          placeholder="image"
        />
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Upload;
