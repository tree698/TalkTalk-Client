import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();
const tokenRef = createRef();
const csrfRef = createRef();

export function AuthContextProvider({
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
      setUser(undefined);
    });
  }, [authErrorEventBus]);

  useEffect(() => {
    authService.csrfToken().then(setCsrfToken).catch(console.error);
  }, [authService]);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
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

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
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
export function useAuthContext() {
  return useContext(AuthContext);
}
