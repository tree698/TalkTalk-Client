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
      type: { 'Content-Type': 'application/json' },
    });
  }

  async login(username, password) {
    return await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      type: { 'Content-Type': 'application/json' },
    });
  }

  async me() {
    return this.http.fetch('/auth/me', {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async logout() {
    return this.http.fetch('/auth/logout', {
      method: 'POST',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async csrfToken() {
    const res = await this.http.fetch('/auth/csrf-token', {
      method: 'GET',
      type: { 'Conent-Type': 'application/json' },
    });
    return res.csrfToken;
  }
}
