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
import Landing from '../pages/landing/landing';
import styles from './authContext.module.css';

const AuthContext = createContext({});
const tokenRef = createRef();
const csrfRef = createRef();

export function AuthProvider({
  authService,
  authErrorEventBus,
  children,
  workService,
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

  const signUp = useCallback(
    async (username, password, email, url) =>
      authService.signup(username, password, email, url),
    [authService]
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then((user) => setUser(user)),
    [authService]
  );

  const logOut = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    [authService]
  );

  const context = useMemo(() => ({ user, signUp, logIn, logOut }), [
    user,
    signUp,
    logIn,
    logOut,
  ]);

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <Landing onSignUp={signUp} onLogIn={logIn} workService={workService} />
      )}
    </AuthContext.Provider>
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

export default AuthContext;
export const fetchToken = () => tokenRef.current;
export const fetchCsrfToken = () => csrfRef.current;
export const useAuth = () => useContext(AuthContext);
