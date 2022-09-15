import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './app.module.css';
import { useAuth } from './context/authContext';
import Home from './pages/home/home';
import Talk from './pages/talk/talk';
import Upload from './pages/upload/upload';

const App = ({ workService }) => {
  const { user, logOut } = useAuth();
  const onLogout = () => {
    logOut();
  };

  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/upload" element={<Upload workService={workService} />} />
      </Routes>
    </>
  );
};

export default App;
