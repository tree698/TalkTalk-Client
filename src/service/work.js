export default class WorkService {
  constructor(http) {
    this.http = http;
  }

  async showWorks(limit, offset) {
    const query = `?limit=${limit}&offset=${offset}`;
    return this.http.fetch(`/work/carousel${query}`, {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async getWorks(limit, offset, username) {
    const query = username
      ? `?username=${username}&limit=${limit}&offset=${offset}`
      : `?limit=${limit}&offset=${offset}`;
    return this.http.fetch(`/work${query}`, {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async searchWorks(limit, offset, searchTerm) {
    const query = `?limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`;
    return this.http.fetch(`/work/search${query}`, {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async createWork(title, description, brush, originalName, fileName) {
    return this.http.fetch('/work', {
      method: 'POST',
      type: { 'Content-Type': 'application/json' },
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
      body: formData,
    });
  }

  async deleteWork(workId) {
    return this.http.fetch(`/work/${workId}`, {
      method: 'DELETE',
      type: { 'Content-Type': 'application/json' },
    });
  }
}
