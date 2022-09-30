import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.module.css';
import { useAuth } from './context/authContext';
import Home from './pages/home/home';
import Talk from './pages/talk/talk';
import Upload from './pages/upload/upload';

const App = ({ workService }) => {
  const [selectedWork, setSelectedWork] = useState();

  const { user, logOut } = useAuth();
  const onLogout = () => {
    logOut();
  };

  const handleSelectedWork = useCallback((work) => {
    setSelectedWork(work);
  }, []);

  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <Routes>
        <Route
          path="/"
          element={
            <Home workService={workService} onClickWork={handleSelectedWork} />
          }
        />
        <Route path="/talk" element={<Talk selectedWork={selectedWork} />} />
        <Route path="/upload" element={<Upload workService={workService} />} />
      </Routes>
    </>
  );
};

export default App;
