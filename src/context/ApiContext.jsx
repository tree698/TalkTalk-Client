import {
  createContext,
  createRef,
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
  // useImperativeHandle(tokenRef, () => (user ? user.token : undefined));
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
      .then((user) => setUser((prev) => user))
      .catch(console.error);
  }, [authService]);

  const context = useMemo(
    () => ({
      user,
      authService,
      tweetService,
      workService,
    }),
    [user, authService, tweetService, workService]
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

// export default AuthContext;
export const fetchToken = () => tokenRef.current;
export const fetchCsrfToken = () => csrfRef.current;
export function useApiContext() {
  return useContext(ApiContext);
}
