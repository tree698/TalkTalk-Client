import React from 'react';
import { useNavigate } from 'react-router-dom';

const AllWorks = ({ work, onClickWork }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/talk');
    onClickWork(work);
  };

  return (
    <button onClick={onClickHandler}>
      <img
        style={{ width: '30%' }}
        src={`${baseURL}/uploaded_images/${work.fileName}`}
        alt=""
      />
      <p>{work.title}</p>
      <p>{work.usesrname}</p>
    </button>
  );
};

export default AllWorks;
