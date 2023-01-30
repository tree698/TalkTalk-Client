const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export default class AuthService {
  constructor(http) {
    this.http = http;
  }

  async signup(username, password, email, photo) {
    return await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        photo,
      }),
      type: CONTENT_TYPE,
    });
  }

  async login(username, password) {
    return await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      type: CONTENT_TYPE,
    });
  }

  async me() {
    return await this.http.fetch('/auth/me', {
      method: 'GET',
      type: CONTENT_TYPE,
    });
  }

  async logout() {
    return await this.http.fetch('/auth/logout', {
      method: 'POST',
      type: CONTENT_TYPE,
    });
  }

  async csrfToken() {
    const res = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
      type: CONTENT_TYPE,
    });
    return res.csrfToken;
  }
}
