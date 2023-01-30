const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export default class WorkService {
  constructor(http) {
    this.http = http;
  }

  async showWorks(limit, offset) {
    const query = `?limit=${limit}&offset=${offset}`;
    return await this.http.fetch(`/work/carousel${query}`, {
      method: 'GET',
      type: CONTENT_TYPE,
    });
  }

  async getWorks(limit, offset, username) {
    const query = username
      ? `?username=${username}&limit=${limit}&offset=${offset}`
      : `?limit=${limit}&offset=${offset}`;
    return await this.http.fetch(`/work${query}`, {
      method: 'GET',
      type: CONTENT_TYPE,
    });
  }

  async searchWorks(limit, offset, searchTerm) {
    const query = `?limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`;
    return await this.http.fetch(`/work/search${query}`, {
      method: 'GET',
      type: CONTENT_TYPE,
    });
  }

  async createWork(title, description, brush, originalName, fileName) {
    return await this.http.fetch('/work', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        brush,
        originalName,
        fileName,
      }),
      type: CONTENT_TYPE,
    });
  }

  async uploadImage(file) {
    let formData = new FormData();
    formData.append('file', file[0]);
    return await this.http.fetch('/work/image', {
      method: 'POST',
      body: formData,
    });
  }

  async deleteWork(workId) {
    return await this.http.fetch(`/work/${workId}`, {
      method: 'DELETE',
      type: CONTENT_TYPE,
    });
  }
}
