import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../lib/supabase';
import IErrorState from '../../resources/ErrorState.interface';
import Button from '../Button';

import styles from './Login.module.scss';

export function Login() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorState>({
    error: false,
    errorMessage: '',
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError({
      error: false,
      errorMessage: '',
    });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError({
          error: true,
          errorMessage: error,
        });
      } else {
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setError({
        error: false,
        errorMessage: String(error),
      });
    }
  };

  return user ? (
    <div>Вы уже вошли как {user.email}</div>
  ) : (
    <div className={styles.login}>
      <h2>Добро пожаловать!</h2>
      <label htmlFor="email">
        Эл. почта:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        Пароль:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <Button onClick={handleLogin} disabled={loading}>
        {loading ? 'Загрузка' : 'Войти'}
      </Button>
      {error.error && <div>{String(error.errorMessage)}</div>}
      <div>
        <p>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
          Забыли пароль? <Link to="/recover">Восстановить</Link>
        </p>
      </div>
    </div>
  );
}
