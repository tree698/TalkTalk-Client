import React from 'react';
import './app.module.css';
import { useAuth } from './context/authContext';

const App = () => {
  //   const { user, logOut } = useAuth();
  //   const onLogout = () => {
  //     logOut();
  //   };

  return (
    <h1>
      Finally Started!
      {/* <button className="menu-item" onClick={onLogout}>
        Logout
      </button> */}
    </h1>
  );
};

export default App;
