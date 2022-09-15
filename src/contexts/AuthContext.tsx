/* eslint-disable max-lines-per-function */
import React, { createContext, useState } from 'react';
import { ContextProviderPropsInterface } from '../interfaces';

interface UserContextInterface {
  uid: number;
  username: string;
}

interface ResponseDtoInterface {
  uid: number;
  username: string;
  email: string;
}

interface AuthContextInterface {
  user: UserContextInterface | null;
  login(email: string, upass: string): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | null>({
  user: null,
  login: async () => undefined,
  logout: async () => undefined,
});

export const AuthContextProvider = ({
  children,
}: ContextProviderPropsInterface) => {
  const [user, setAuth] = useState<UserContextInterface | null>(null);
  const login = async (email: string, upass: string): Promise<void> => {
    let data: ResponseDtoInterface | null = null;
    try {
      const response = await fetch('https://api.ptcore.test/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: email, // email@email.com
          password: upass, // password
        }),
      });
      data = JSON.parse(await response.json());
    } catch (e: any) {
      // can add behavior to handle bad connection
      console.error('Error: ', e);
    }
    if (data && data.username && data.uid) {
      setAuth({ uid: data.uid, username: data.username });
    }
  };

  const logout = async () => {
    // make a request to destroy JWT cookie and erase
    try {
      const response = await fetch('https://api.ptcore.test/logout', {
        method: 'get',
        credentials: 'include',
      });
    } catch (e: any) {
      // can add behavior to handle bad connection
    }
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
