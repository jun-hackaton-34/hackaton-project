import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import { supabase } from '../../lib/supabase';
import IErrorState from '../../resources/ErrorState.interface';
import Button from '../Button';

export function Register() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorState>({
    error: false,
    errorMessage: '',
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError({
      error: false,
      errorMessage: '',
    });
    try {
      const { error } = await supabase.auth.signUp({
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
        error: true,
        errorMessage: String(error),
      });
    }
  };

  return user ? (
    <div>Вы уже вошли как {user.email}</div>
  ) : (
    <div>
      <h2>Регистрация</h2>
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

      <Button onClick={handleRegister} disabled={loading}>
        {loading ? 'Загрузка' : 'Зарегистрироваться'}
      </Button>
      {error.error && <div>{String(error.errorMessage)}</div>}
      <div>
        <p>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
