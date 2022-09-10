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
const contextRef = createRef();

export function AuthProvider({ authService, authErrorEventBus, children }) {
  const [user, setUser] = useState(undefined);

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  // 필요 한가??
  useEffect(() => {
    authErrorEventBus.listen((err) => {
      setUser(undefined);
    });
  }, [authErrorEventBus]);

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
      {user ? children : <Landing onSignUp={signUp} onLogIn={logIn} />}
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
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);
