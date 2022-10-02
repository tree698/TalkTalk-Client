import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ActionBtn from '../../component/actionBtn/actionBtn';
import AllWorks from '../../component/allWorks/allWorks';
import Header from '../../component/header/header';
import MyWorks from '../../component/myWorks/myWorks';
import { useAuth } from '../../context/authContext';
import styles from './home.module.css';

const Home = ({ workService, onClickWork }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    navigate('/');
  }, []);

  const onAllWorks = () => {
    navigate('/');
  };

  const onMyWorks = () => {
    navigate(`/${user.username}`);
  };

  return (
    <div>
      <Header addUpload={true} />
      <ActionBtn onAllWorks={onAllWorks} onMyWorks={onMyWorks} />
      <h1>Home Page</h1>
      <Routes>
        <Route
          path="/"
          element={
            <AllWorks workService={workService} onClickWork={onClickWork} />
          }
        />
        <Route
          path="/:username"
          element={
            <MyWorks workService={workService} onClickWork={onClickWork} />
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
