import { useState } from 'react';

import { supabase } from '../../lib/supabase';
import IErrorState from '../../resources/ErrorState.interface';
import Button from '../Button';

export function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<IErrorState>({
    error: false,
    errorMessage: '',
  });

  const handleRegister = async () => {
    setError({
      error: false,
      errorMessage: '',
    });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError({
          error: true,
          errorMessage: error,
        });
      } else {
        console.error('Signed up successfully:', data);
      }
    } catch (error) {
      setError({
        error: true,
        errorMessage: String(error),
      });
    }
  };

  return (
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

      <Button onClick={handleRegister}>Зарегистрироваться</Button>
      {error.error && <div>{String(error.errorMessage)}</div>}
    </div>
  );
}
