export default class WorkService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async getWorks(limit, offset, username) {
    const query = username
      ? `?username=${username}&limit=${limit}&offset=${offset}`
      : `?limit=${limit}&offset=${offset}`;
    return this.http.fetch(`/work${query}`, {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
      headers: this.getHeaders(),
    });
  }

  async createWork(title, description, brush, originalName, fileName) {
    return this.http.fetch('/work', {
      method: 'POST',
      type: { 'Content-Type': 'application/json' },
      headers: this.getHeaders(),
      body: JSON.stringify({
        title,
        description,
        brush,
        originalName,
        fileName,
      }),
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

  async deleteWork(workId) {
    return this.http.fetch(`/work/${workId}`, {
      method: 'DELETE',
      type: { 'Content-Type': 'application/json' },
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
  }
}
