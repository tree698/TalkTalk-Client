import AuthService from '../auth';

describe('AuthService', () => {
  let authService;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {
      fetch: jest.fn(),
    };
    authService = new AuthService(mockHttp);
  });

  describe('signup', () => {
    it('should call http.fetch with correct parameters', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const email = 'testemail@test.com';
      const photo = 'testphoto';
      await authService.signup(username, password, email, photo);
      expect(mockHttp.fetch).toHaveBeenCalledWith('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
          email,
          photo,
        }),
        type: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('login', () => {
    it('should call http.fetch with correct parameters', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      await authService.login(username, password);
      expect(mockHttp.fetch).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        type: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('me', () => {
    it('should call http.fetch with correct parameters', async () => {
      await authService.me();
      expect(mockHttp.fetch).toHaveBeenCalledWith('/auth/me', {
        method: 'GET',
        type: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('logout', () => {
    it('should call http.fetch with correct parameters', async () => {
      await authService.logout();
      expect(mockHttp.fetch).toHaveBeenCalledWith('/auth/logout', {
        method: 'POST',
        type: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('csrfToken', () => {
    it('should call http.fetch with correct parameters and return csrfToken', async () => {
      const mockCsrfToken = 'mockCsrfToken';
      mockHttp.fetch.mockResolvedValueOnce({ csrfToken: mockCsrfToken });
      const csrfToken = await authService.csrfToken();
      expect(mockHttp.fetch).toHaveBeenCalledWith('/auth/csrf-token', {
        method: 'GET',
        type: { 'Content-Type': 'application/json' },
      });
      expect(csrfToken).toBe(mockCsrfToken);
    });
  });
});
