import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';
import Button from '../Button';

import styles from './Header.module.scss';

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
    <header className={styles.header}>
      <Link to="/" className={styles.header__link}>
        Домой
      </Link>
      <Link to="/leaderboard" className={styles.header__link}>
        Лидеры
      </Link>
      <Link to="/rules" className={styles.header__link}>
        Как играть?
      </Link>
      {auth ? (
        <div>
          <Link to="/profile" className={styles.header__link}>
            Профиль
          </Link>
          <Button onClick={handleLogout}>{user.email} - Выйти</Button>
        </div>
      ) : (
        <Link to="/login" className={styles.header__link}>
          Войти
        </Link>
      )}
    </header>
  );
}
