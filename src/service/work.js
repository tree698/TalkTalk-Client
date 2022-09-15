export default class WorkService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async createWork(title, description, brush, image) {
    return this.http.fetch(`/work`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ title, description, brush, image }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
