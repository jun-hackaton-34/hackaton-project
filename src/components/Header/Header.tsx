import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import Button from '../Button';

export function Header() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth, signOut, user }: any = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <Link to="/">Домой</Link>
      <Link to="/leaderboard">Лидеры</Link>
      <Link to="/rules">Как играть?</Link>
      {auth ? (
        <div>
          <Link to="/profile">Профиль</Link>
          <Button onClick={handleLogout}>{user.email} - Выйти</Button>
        </div>
      ) : (
        <Link to="/login">Войти</Link>
      )}
    </header>
  );
}
