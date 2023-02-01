import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  AuthErrorEventBus,
  ApiProvider,
  fetchCsrfToken,
  fetchToken,
} from './context/ApiContext';
import HttpClient from './network/http';
import AuthService from './service/auth';
import WorkService from './service/work';
import TweetService from './service/tweet';
import Socket from './network/socket';
import { retryConfig } from './config.js';

const queryClient = new QueryClient();
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
    <QueryClientProvider client={queryClient}>
      <ApiProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
        tweetService={tweetService}
        workService={workService}
      >
        <Outlet />
      </ApiProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
