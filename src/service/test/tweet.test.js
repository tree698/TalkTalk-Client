import TweetService from '../tweet.js';

describe('TweetService', () => {
  let tweetService;
  let mockHttp;
  let mockSocket;

  beforeEach(() => {
    mockHttp = {
      fetch: jest.fn(),
    };
    mockSocket = {
      onSync: jest.fn(),
    };
    tweetService = new TweetService(mockHttp, mockSocket);
  });

  describe('getTweets', () => {
    it('should call http.fetch with correct arguments', async () => {
      const mockTweets = [{ id: 1, text: 'Hello' }];
      mockHttp.fetch.mockResolvedValue({ tweets: mockTweets });
      const username = 'johndoe';
      const workId = '123';

      const result = await tweetService.getTweets(username, workId);

      expect(mockHttp.fetch).toHaveBeenCalledWith(
        `/tweets?username=${username}&workId=${workId}`,
        {
          method: 'GET',
          type: { 'Content-Type': 'application/json' },
        }
      );
      expect(result).toEqual({ tweets: mockTweets });
    });

    it('should call http.fetch with correct arguments when username is not provided', async () => {
      const mockTweets = [{ id: 1, text: 'Hello' }];
      mockHttp.fetch.mockResolvedValue({ tweets: mockTweets });
      const workId = '123';

      const result = await tweetService.getTweets(undefined, workId);

      expect(mockHttp.fetch).toHaveBeenCalledWith(`/tweets?workId=${workId}`, {
        method: 'GET',
        type: { 'Content-Type': 'application/json' },
      });
      expect(result).toEqual({ tweets: mockTweets });
    });
  });

  describe('deleteTweet', () => {
    it('should call http.fetch with correct arguments', async () => {
      const tweetId = 'abc123';

      const result = await tweetService.deleteTweet(tweetId);

      expect(mockHttp.fetch).toHaveBeenCalledWith(`/tweets/${tweetId}`, {
        method: 'DELETE',
        type: { 'Content-Type': 'application/json' },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('onSync', () => {
    it('should call socket.onSync with correct arguments', () => {
      const callback = jest.fn();

      tweetService.onSync(callback);

      expect(mockSocket.onSync).toHaveBeenCalledWith('tweets', callback);
    });
  });
});
