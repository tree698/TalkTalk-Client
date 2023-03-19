import WorkService from '../work';

describe('WorkService', () => {
  const CONTENT_TYPE = { 'Content-Type': 'application/json' };
  let mockHttp;
  let workService;
  let http;

  beforeEach(() => {
    http = {
      fetch: jest.fn(),
    };
    mockHttp = {
      fetch: jest.fn(),
    };
    workService = new WorkService(mockHttp);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('showWorks', () => {
    it('should fetch works with limit and offset', async () => {
      const limit = 10;
      const offset = 0;
      const expectedUrl = `/work/carousel?limit=${limit}&offset=${offset}`;
      const expectedResponse = [{ id: 1, title: 'Work 1' }];

      mockHttp.fetch.mockResolvedValueOnce({ works: expectedResponse });

      const result = await workService.showWorks(limit, offset);

      expect(mockHttp.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        type: CONTENT_TYPE,
      });
      expect(result).toEqual({ works: expectedResponse });
    });
  });

  describe('getWorks', () => {
    it('should fetch works with limit and offset', async () => {
      const limit = 10;
      const offset = 0;
      const expectedUrl = `/work?limit=${limit}&offset=${offset}`;
      const expectedResponse = [{ id: 1, title: 'Work 1' }];

      mockHttp.fetch.mockResolvedValueOnce({ works: expectedResponse });

      const result = await workService.getWorks(limit, offset);

      expect(mockHttp.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        type: CONTENT_TYPE,
      });
      expect(result).toEqual({ works: expectedResponse });
    });

    it('should fetch works with limit, offset, and username if username is provided', async () => {
      const limit = 10;
      const offset = 0;
      const username = 'user1';
      const expectedUrl = `/work?username=${username}&limit=${limit}&offset=${offset}`;
      const expectedResponse = [{ id: 1, title: 'Work 1' }];

      mockHttp.fetch.mockResolvedValueOnce({ works: expectedResponse });

      const result = await workService.getWorks(limit, offset, username);

      expect(mockHttp.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        type: CONTENT_TYPE,
      });
      expect(result).toEqual({ works: expectedResponse });
    });
  });

  describe('searchWorks', () => {
    it('should fetch works with limit, offset, and searchTerm', async () => {
      const limit = 10;
      const offset = 0;
      const searchTerm = 'painting';
      const expectedUrl = `/work/search?limit=${limit}&offset=${offset}&searchTerm=${searchTerm}`;
      const expectedResponse = [{ id: 1, title: 'Work 1' }];

      mockHttp.fetch.mockResolvedValueOnce({ works: expectedResponse });

      const result = await workService.searchWorks(limit, offset, searchTerm);

      expect(mockHttp.fetch).toHaveBeenCalledWith(expectedUrl, {
        method: 'GET',
        type: CONTENT_TYPE,
      });
      expect(result).toEqual({ works: expectedResponse });
    });
  });
});
