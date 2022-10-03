import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './displayWorks.module.css';

const DisplayWork = ({
  work,
  onClickWork,
  addDeleteBtn,
  sendToBeDeletedWork,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [test, setTest] = useState();

  const onChange = (event) => {
    if (event.target.checked) {
      setTest(work.id);
      sendToBeDeletedWork(test);
    }
  };

  const onClickHandler = () => {
    navigate('/talk');
    onClickWork(work);
  };

  return (
    <div>
      {addDeleteBtn && (
        <input name="delete" id="delete" onChange={onChange} type="checkbox" />
      )}
      <button onClick={onClickHandler}>
        <img
          style={{ width: '30%' }}
          src={`${baseURL}/uploaded_images/${work.fileName}`}
          alt=""
        />
        <p>{work.title}</p>
        <p>{work.usesrname}</p>
      </button>
    </div>
  );
};

export default DisplayWork;
