import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../../component/banner/banner';
import FileUpload from '../../component/fileUpload/fileUpload';
import Footer from '../../component/footer/footer';
import Header from '../../component/header/header';
import styles from './upload.module.css';

const Upload = ({ workService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brush, setBrush] = useState('');
  const [fileName, setFileName] = useState('');
  const [originalName, setOriginalName] = useState('');
  const [text, setText] = useState('');

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
    <div className={styles.container}>
      <div className={styles.header}>
        <Header addHome={true} />
      </div>
      <Banner text={text} />

      <div className={styles.upload}>
        <h2 className={styles.title}>Upload your painting</h2>
        <div className={styles.display}>
          <div className={styles.fileUpload__wrap}>
            <FileUpload workService={workService} liftFile={liftFile} />
          </div>
          <div className={styles.image__wrap}>
            {fileName ? (
              <img
                src={`${baseURL}/uploaded_images/${fileName}`}
                className={styles.image}
                alt=""
              />
            ) : (
              <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
            )}
          </div>
        </div>
        {fileName && (
          <div className={styles.confirmDisplay}>
            <p className={styles.message}>Successfully uploaded!</p>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              Want to cancel?
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className={styles.form}>
          <label htmlFor="title" className={styles.form__label}>
            Title
          </label>{' '}
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            className={styles.form__input}
            placeholder="Title"
            id="title"
            required
          />
          <br />
          <label htmlFor="brush" className={styles.form__label}>
            Brush
          </label>{' '}
          <br />
          <input
            type="text"
            name="brush"
            value={brush}
            onChange={onChange}
            className={styles.form__input}
            placeholder="Brush"
            id="brush"
          />
          <br />
          <label htmlFor="description" className={styles.form__label}>
            Say something
          </label>
          <br />
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            className={styles.form__input}
            cols="30"
            rows="3"
            placeholder="say something"
            id="description"
          ></textarea>
          <br />
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
export default Upload;
