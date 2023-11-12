import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';

export function AuthRoute() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default AuthRoute;
