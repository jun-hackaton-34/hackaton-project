import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import Button from '../Button';

export function UpdatePassword() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { updatePassword }: any = useAuth();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordUpdate = async () => {
    try {
      setErrorMsg('');
      setLoading(true);
      const { error } = await updatePassword(password);
      if (!error) {
        navigate('/');
      } else {
        setErrorMsg(error);
      }
    } catch (error) {
      setErrorMsg('Произошла ошибка! Попробуйте снова');
    }
    setLoading(false);
  };

  return (
    <>
      <label htmlFor="password">
        Пароль:
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {errorMsg && <div>{errorMsg}</div>}
      <Button disabled={loading} onClick={handlePasswordUpdate}>
        Обновить
      </Button>
    </>
  );
}
