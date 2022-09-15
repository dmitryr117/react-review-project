import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { LoginPage } from '../pages';
import { AuthContext } from '../contexts';

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth && auth.user;
};

export const ProtectedRoutes = () => {
  const authState = useAuth();
  return authState ? <Outlet /> : <LoginPage />;
};
