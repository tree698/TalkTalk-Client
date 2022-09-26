import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../component/fileUpload/fileUpload';
import styles from './upload.module.css';

const Upload = ({ workService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brush, setBrush] = useState('');
  const [fileName, setFileName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [text, setText] = useState('');
  // const [isAlert, setIsAlert] = useState(false);

  const baseURL = process.env.REACT_APP_BASE_URL;
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
      default:
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    workService //
      .createWork(title, description, brush, originalName, fileName)
      .catch(setError);
    navigate('/');
  };

  const setError = (error) => {
    setText(error.toString());
    // setIsAlert(true);
  };

  const liftFile = (file) => {
    setOriginalName(file.originalName);
    setFileName(file.fileName);
  };

  const handleCancel = () => {
    setFileName('');
    setOriginalName();
  };

  return (
    <div>
      <h1>Upload Page</h1>
      {text && <p>{text}</p>}
      <FileUpload workService={workService} liftFile={liftFile} />
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

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>

      <img src={`${baseURL}/uploaded_images/${fileName}`} alt="" />
      <p>{originalName}</p>
      <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
export default Upload;
