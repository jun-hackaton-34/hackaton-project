import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '@supabase/supabase-js';

import Loader from '../components/Loader';
import { supabase } from '../lib/supabase';
import { IAuthContext } from '../resources/AuthContext.interface';

const AuthContext = createContext<IAuthContext | null>({
  auth: false,
  user: {} as User,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://hackaton-project-dun.vercel.app/updatepassword',
  });

const updatePassword = (updatedPassword: string) =>
  supabase.auth.updateUser({ password: updatedPassword });

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;
      if (currentUser) {
        setUser(currentUser ?? null);
        setAuth(true);
      }

      setLoading(false);
    };
    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuth(false);
      } else if (event === 'SIGNED_IN') {
        if (session) {
          setUser(session.user);
          setAuth(true);
        }
      } else if (event === 'SIGNED_OUT') {
        setAuth(false);
        setUser(null);
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ auth, user, login, signOut, passwordReset, updatePassword }}
    >
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
