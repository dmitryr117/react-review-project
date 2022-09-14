/* eslint-disable max-lines-per-function */
import React, { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, loginUser, authSelector } from '../../redux';

export const LoginPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(authSelector);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [upass, setUpass] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authState.isLoggedIn && authState.user) {
      navigate('/profile');
    } else {
      console.log('No User');
    }
  }, [authState]);

  const processLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    // eslint-disable-next-line sonarjs/cognitive-complexity
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(loginUser({ email, upass }));
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
