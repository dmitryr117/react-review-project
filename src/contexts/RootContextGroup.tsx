import React from 'react';
import { ContextProviderPropsInterface } from '../interfaces';
import { AuthContextProvider } from './AuthContext';
import { CountContextProvider } from './CountContext';

export const RootContextGroup = ({
  children,
}: ContextProviderPropsInterface) => {
  return (
    <AuthContextProvider>
      <CountContextProvider>{children}</CountContextProvider>
    </AuthContextProvider>
  );
};
