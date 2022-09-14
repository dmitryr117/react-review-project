import React, { FC, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const logOut = async () => {
    await logout();
    navigate('/');
  };

  if (user && user?.username) {
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
