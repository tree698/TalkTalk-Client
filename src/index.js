import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Talk from './pages/Talk';
import Upload from './pages/Upload';
import AllDrawings from './pages/AllDrawings';
import SearchedDrawings from './pages/SearchedDrawings';
import MyDrawings from './pages/MyDrawings';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import {
  ProtectedHome,
  ProtectedLanding,
  ProtectedRouter,
  ProtectGoToLandingWithUser,
} from './components/ProtectedRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <ProtectGoToLandingWithUser>
            <Landing />
          </ProtectGoToLandingWithUser>
        ),
        children: [
          { index: true, element: <Login /> },
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
        ],
      },
      {
        path: '/home',
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
        children: [
          { index: true, element: <AllDrawings /> },
          { path: 'alldrawings', element: <AllDrawings /> },
          { path: 'searcheddrawings', element: <SearchedDrawings /> },
          { path: 'mydrawings', element: <MyDrawings /> },
        ],
      },
      {
        path: '/talk',
        element: (
          <ProtectedRouter>
            <Talk />
          </ProtectedRouter>
        ),
      },
      {
        path: '/upload',
        element: (
          <ProtectedRouter>
            <Upload />
          </ProtectedRouter>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
