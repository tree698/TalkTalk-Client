const CONTENT_TYPE = { 'Content-Type': 'application/json' };

export default class TweetService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  async getTweets(username, workId) {
    const query = username
      ? `?username=${username}&workId=${workId}`
      : `?workId=${workId}`;
    return await this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      type: CONTENT_TYPE,
    });
  }

  async createTweet(text, workId) {
    const query = `?workId=${workId}`;
    return await this.http.fetch(`/tweets${query}`, {
      method: 'POST',
      body: JSON.stringify({ text }),
      type: CONTENT_TYPE,
    });
  }

  async deleteTweet(tweetId) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      type: CONTENT_TYPE,
    });
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
