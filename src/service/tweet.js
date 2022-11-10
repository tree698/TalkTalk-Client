export default class TweetService {
  constructor(http, socket) {
    this.http = http;
    this.socket = socket;
  }

  async getTweets(username, workId) {
    const query = username
      ? `?username=${username}&workId=${workId}`
      : `?workId=${workId}`;
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
      type: { 'Content-Type': 'application/json' },
    });
  }

  async createTweet(text, workId) {
    const query = `?workId=${workId}`;
    return this.http.fetch(`/tweets${query}`, {
      method: 'POST',
      type: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      type: { 'Content-Type': 'application/json' },
    });
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
