import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import {
  AuthErrorEventBus,
  AuthContextProvider,
  fetchCsrfToken,
  fetchToken,
} from './context/AuthContext';
import HttpClient from './network/http';
import AuthService from './service/auth';
import WorkService from './service/work';
import TweetService from './service/tweet';
import Socket from './network/socket';
import { retryConfig } from './config.js';

const baseURL = process.env.REACT_APP_BASE_URL;
const authErrorEventBus = new AuthErrorEventBus();
const httpClient = new HttpClient(
  baseURL,
  authErrorEventBus,
  () => fetchCsrfToken(),
  retryConfig
);
const authService = new AuthService(httpClient);
const socketClient = new Socket(baseURL, () => fetchToken());
const tweetService = new TweetService(httpClient, socketClient);
const workService = new WorkService(httpClient);

function App() {
  return (
    <AuthContextProvider
      authService={authService}
      authErrorEventBus={authErrorEventBus}
      tweetService={tweetService}
      workService={workService}
    >
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
