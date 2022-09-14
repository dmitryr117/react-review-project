/* eslint-disable max-lines-per-function */
import React, { createContext, useState } from 'react';
import { ContextProviderPropsInterface } from '../../interfaces';

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
  login(email: string, upass: string): Promise<boolean>;
  logout(): Promise<boolean>;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  login: async () => false,
  logout: async () => false,
});

export const AuthContextProvider = ({
  children,
}: ContextProviderPropsInterface) => {
  const [user, setAuth] = useState<UserContextInterface | null>(null);
  const login = async (email: string, upass: string): Promise<boolean> => {
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
      return false;
    }
    if (data && data.username && data.uid) {
      setAuth({ uid: data.uid, username: data.username });
      return true;
    }
    return false;
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
      return false;
    }
    setAuth(null);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
