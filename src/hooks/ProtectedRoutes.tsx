import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { LoginPage } from '../pages';
import { authSelector } from '../redux';

export const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export const ProtectedRoutes = () => {
  const authState = useSelector(authSelector);
  return authState.isLoggedIn && authState.user ? <Outlet /> : <LoginPage />;
};
