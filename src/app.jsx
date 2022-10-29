import React from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './app.module.css';

import Home from './pages/home/home';
import Talk from './pages/talk/talk';
import Upload from './pages/upload/upload';

const App = ({ workService, tweetService }) => {
  const [selectedWork, setSelectedWork] = useState();
  const navigate = useNavigate();

  useEffect(() => navigate('/'), []);

  const handleSelectedWork = useCallback(
    (work) => {
      setSelectedWork(work);
    },
    [selectedWork]
  );

  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <Home workService={workService} onClickWork={handleSelectedWork} />
          }
        />
        <Route
          path="/talk/*"
          element={
            <Talk selectedWork={selectedWork} tweetService={tweetService} />
          }
        />
        <Route path="/upload" element={<Upload workService={workService} />} />
      </Routes>
    </>
  );
};

export default App;
