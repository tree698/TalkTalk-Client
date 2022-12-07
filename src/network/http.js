import axios from 'axios';

export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL: baseURL,
      withCredentials: true,
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
