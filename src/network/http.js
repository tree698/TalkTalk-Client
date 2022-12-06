export default class HttpClient {
  constructor(baseURL, authErrorEventBus, getCsrfToken) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
  }

  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        ...options.type,
        'talktalk-csrf-token': this.getCsrfToken(),
      },
      credentials: 'include',
    });
    let data;
    try {
      data = await res.json();
    } catch (error) {
      // console.log 삭제 필요?????
      console.error(error);
    }

    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message
          ? data.message
          : 'Something went wrong! Try again!';
      const error = new Error(message);

      // 해결한 건가??
      if (res.status === 401) {
        this.authErrorEventBus.notify(error);
        // return;
      }
      throw error;
    }
    return data;
  }
}
