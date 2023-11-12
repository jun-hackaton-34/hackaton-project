import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import Button from '../Button';

export function RecoverPassword() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { passwordReset }: any = useAuth();
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  const handleRecover = async () => {
    try {
      setLoading(true);
      setMsg('');
      if (email) {
        await passwordReset(email);
        setMsg('Ссылка на восстановление пароля отправлена на Вашу почту!');
        setSuccess(true);
      } else {
        setMsg('Пожалуйста, введите действительный email-адрес');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <h2>Восстановление доступа</h2>
      {success && !loading ? (
        <div>Следуйте инструкциям в письме</div>
      ) : (
        <>
          <label htmlFor="email">
            Эл. почта:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Button onClick={handleRecover} disabled={loading}>
            {loading ? 'Загрузка' : 'Отправить запрос'}
          </Button>
          <p>
            Попробовать <Link to="/login">войти</Link> снова?
          </p>
        </>
      )}
      {msg && <div>{msg}</div>}
    </>
  );
}
