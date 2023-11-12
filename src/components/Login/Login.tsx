import { useState } from 'react';
import { Link } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import IErrorState from '../../resources/ErrorState.interface';
import Button from '../Button';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<IErrorState>({
    error: false,
    errorMessage: '',
  });

  const handleLogin = async () => {
    setError({
      error: false,
      errorMessage: '',
    });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError({
          error: true,
          errorMessage: error,
        });
      } else {
        console.error('Logged in successfully:', data);
      }
    } catch (error) {
      setError({
        error: false,
        errorMessage: String(error),
      });
    }
  };

  return (
    <div>
      <h2>Добро пожаловать снова</h2>
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

      <Button onClick={handleLogin}>Войти</Button>
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
