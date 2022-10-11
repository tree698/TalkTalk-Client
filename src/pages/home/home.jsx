import React from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ActionBtn from '../../component/actionBtn/actionBtn';
import AllWorks from '../../component/allWorks/allWorks';
import Header from '../../component/header/header';
import MyWorks from '../../component/myWorks/myWorks';
import SearchWork from '../../component/searchWork/searchWorks';
import { useAuth } from '../../context/authContext';
import styles from './home.module.css';

const Home = ({ workService, onClickWork }) => {
  const [addDeleteBtn, setAddDeleteBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const { user } = useAuth();

  const onAllWorks = () => {
    navigate('/');
  };

  const onMyWorks = () => {
    setAddDeleteBtn(true);
    navigate(`/${user.username}`);
  };

  const onSearchTermHandler = (term) => {
    setSearchTerm(term);
    navigate('/search');
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
            <AllWorks
              workService={workService}
              onClickWork={onClickWork}
              onSendSearchTerm={onSearchTermHandler}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchWork
              workService={workService}
              onClickWork={onClickWork}
              searchTerm={searchTerm}
            />
          }
        />
        <Route
          path="/:username"
          element={
            <MyWorks
              workService={workService}
              onClickWork={onClickWork}
              addDeleteBtn={addDeleteBtn}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
