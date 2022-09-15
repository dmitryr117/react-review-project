/* eslint-disable max-lines-per-function */
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';

export const LoginPage: FC = () => {
  const authState = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [upass, setUpass] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authState && authState.user) {
      navigate('/profile');
    }
  }, [authState]);

  const processLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    authState?.login(email, upass);
    setLoading(false);
    console.log('done');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Login Page {String(loading)}</h2>
      <form onSubmit={processLogin}>
        <label>Email:</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="text"
          value={email}
          required
        />
        <label>Password</label>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpass(e.target.value)
          }
          type="password"
          value={upass}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
