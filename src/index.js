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
import AllWorks from './pages/AllWorks';
import SearchWorks from './pages/SearchWorks';
import MyWorks from './pages/MyWorks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Display from './pages/Display';
import { ProtectedHome, ProtectedLanding } from './components/ProtectedRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedLanding>
            <Landing />
          </ProtectedLanding>
        ),
        children: [
          { index: true, element: <Signup /> },
          { path: 'signup', element: <Signup /> },
          { path: 'login', element: <Login /> },
        ],
      },
      {
        path: '/home',
        element: (
          <ProtectedHome>
            <Home />
          </ProtectedHome>
        ),
        children: [
          { index: true, element: <Display /> },
          {
            path: 'display',
            element: <Display />,
            children: [
              { index: true, element: <AllWorks /> },
              { path: 'allworks', element: <AllWorks /> },
              { path: 'searchworks', element: <SearchWorks /> },
              { path: 'myworks', element: <MyWorks /> },
            ],
          },
          { path: 'talk', element: <Talk /> },
          { path: 'upload', element: <Upload /> },
        ],
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
