import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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
    <Toaster position="top-right" reverseOrder={false} limit="1" />
  </React.StrictMode>
);

reportWebVitals();
