import {
  createContext,
  createRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

const ApiContext = createContext();
const tokenRef = createRef();
const csrfRef = createRef();

export function ApiProvider({
  authService,
  authErrorEventBus,
  tweetService,
  workService,
  children,
}) {
  const [user, setUser] = useState(undefined);
  const [csrfToken, setCsrfToken] = useState(undefined);
  useImperativeHandle(tokenRef, () => (user ? user.token : undefined));
  useImperativeHandle(csrfRef, () => csrfToken);

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      setUser((prev) => undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService
      .csrfToken()
      .then((csrfToken) => setCsrfToken((prev) => csrfToken))
      .catch(console.error);
  }, [authService]);

  useEffect(() => {
    authService
      .me()
      .then((user) => setUser((prev) => user.userInfo))
      .catch(console.error);
  }, [authService]);

  const signUp = useCallback(
    async (username, password, email, url) =>
      authService.signup(username, password, email, url),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) =>
      authService
        .login(username, password)
        .then((user) => setUser(user.userInfo)),
    [authService]
  );

  const logOut = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  );

  const context = useMemo(
    () => ({
      user,
      authService,
      tweetService,
      workService,
      signUp,
      logIn,
      logOut,
    }),
    [user, authService, tweetService, workService, signUp, logIn, logOut]
  );

  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
}

export class AuthErrorEventBus {
  listen(callback) {
    this.callback = callback;
  }

  notify(err) {
    this.callback(err);
  }
}

export const fetchToken = () => tokenRef.current;
export const fetchCsrfToken = () => csrfRef.current;
export function useApiContext() {
  return useContext(ApiContext);
}
