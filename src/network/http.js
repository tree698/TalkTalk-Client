import axios from 'axios';
import axiosRetry from 'axios-retry';

const defaultRetryConfig = {
  retires: 5,
  initialDelayMs: 100,
};

export default class HttpClient {
  constructor(
    baseURL,
    authErrorEventBus,
    getCsrfToken,
    config = defaultRetryConfig
  ) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: true,
    });
    axiosRetry(this.client, {
      retries: config.retires,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.initialDelayMs; // 100, 200, 400, 800, 1600
        const jitter = delay * 0.1 * Math.random(); // 10, 20, ... 160
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) ||
        err.response.status === 429,
    });
  }

  async fetch(url, options) {
    const { method, body, type } = options;
    const req = {
      url,
      method,
      data: body,
      headers: {
        ...type,
        'talktalk-csrf-token': this.getCsrfToken(),
      },
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      if (err.response) {
        const data = err.response.data;
        const message =
          data && data.message
            ? data.message
            : 'Something went wrong! Try again!';
        throw new Error(message);
      }
      throw new Error('connection error');
    }
  }
}
