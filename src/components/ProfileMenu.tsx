import React, { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logOut = async () => {
    await auth?.logout();
    navigate('/');
  };

  if (auth && auth.user) {
    return (
      <>
        <Link to="/profile">Profile</Link>
        <a href="#" onClick={logOut}>
          Logout
        </a>
      </>
    );
  } else {
    return <Link to="/login">Login</Link>;
  }
};
