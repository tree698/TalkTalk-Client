import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import { AuthErrorEventBus, AuthProvider } from './context/authContext';
import TokenStorage from './db/token';
import HttpClient from './network/http';
import AuthService from './service/auth';
import WorkService from './service/work';
import TweetService from './service/tweet';
import Socket from './network/socket';

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(baseURL, authErrorEventBus);
const authService = new AuthService(httpClient, tokenStorage);
const workService = new WorkService(httpClient, tokenStorage);
const socketClient = new Socket(baseURL, () => tokenStorage.getToken());
const tweetService = new TweetService(httpClient, tokenStorage, socketClient);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
        workService={workService}
      >
        <App workService={workService} tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
