import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { BrowserRouter } from 'react-router-dom';
import {
  AuthErrorEventBus,
  AuthProvider,
  fetchToken,
  fetchCsrfToken,
} from './context/authContext';
import HttpClient from './network/http';
import AuthService from './service/auth';
import WorkService from './service/work';
import TweetService from './service/tweet';
import Socket from './network/socket';
// import config from './config.js';
import { config } from './config.js';

const baseURL = process.env.REACT_APP_BASE_URL;
// const config22 = config;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(
  baseURL,
  authErrorEventBus,
  () => fetchCsrfToken(),
  config
);
const authService = new AuthService(httpClient);
const workService = new WorkService(httpClient);
const socketClient = new Socket(baseURL, () => fetchToken());
const tweetService = new TweetService(httpClient, socketClient);

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
