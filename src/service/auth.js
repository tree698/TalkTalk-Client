export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        url,
      }),
      type: { 'Content-Type': 'application/json' },
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      type: { 'Content-Type': 'application/json' },
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      type: { 'Content-Type': 'application/json' },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
