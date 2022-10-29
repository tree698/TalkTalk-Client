import React from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ActionBtn from '../../component/actionBtn/actionBtn';
import AllWorks from '../../component/allWorks/allWorks';
import Footer from '../../component/footer/footer';
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
    <div className={styles.container}>
      <div>
        <Header addUpload={true} />
        <div className={styles.home}>
          <h2 className={styles.title}>Choose a painting</h2>
          <div className={styles.actionBtn}>
            <ActionBtn onAllWorks={onAllWorks} onMyWorks={onMyWorks} />
          </div>
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
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
