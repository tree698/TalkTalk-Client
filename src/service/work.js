export default class WorkService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async createWork(title, description, brush, image) {
    return this.http.fetch('/work', {
      method: 'POST',
      type: { 'Content-Type': 'application/json' },
      headers: this.getHeaders(),
      body: JSON.stringify({ title, description, brush, image }),
    });
  }

  async uploadImage(file) {
    let formData = new FormData();
    formData.append('file', file[0]);

    return this.http.fetch('/work/image', {
      method: 'POST',
      headers: this.getHeaders(),
      body: formData,
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
