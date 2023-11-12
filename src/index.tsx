import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import ErrorFallback from './components/ErrorFallabck';
import Leaderboard from './components/Leaderboard';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Profile from './components/Profile';
import RecoverPassword from './components/RecoverPassword';
import Register from './components/Register';
import Rules from './components/Rules';
import UpdatePassword from './components/UpdatePassword';
import AuthProvider from './context/AuthProvider';
import MainPage from './pages/MainPage';
import App from './App.tsx';

import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/recover"
        element={<RecoverPassword />}
        errorElement={<ErrorFallback />}
      />
      <Route
        path="/updatepassword"
        element={<UpdatePassword />}
        errorElement={<ErrorFallback />}
      />
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route
          path="/"
          element={<MainPage />}
          errorElement={<ErrorFallback />}
        />
        <Route
          path="/login"
          element={<Login />}
          errorElement={<ErrorFallback />}
        />
        <Route
          path="/register"
          element={<Register />}
          errorElement={<ErrorFallback />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard />}
          errorElement={<ErrorFallback />}
        />
        <Route
          path="/rules"
          element={<Rules />}
          errorElement={<ErrorFallback />}
        />
        <Route element={<AuthRoute />}>
          <Route
            path="/profile"
            element={<Profile />}
            errorElement={<ErrorFallback />}
          />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
