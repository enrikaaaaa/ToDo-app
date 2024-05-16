import { createContext, useState } from 'react';

import PropTypes from 'prop-types';
import { ROUTES } from '../routes/consts';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext({
  authenticated: false,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedInInitial = !!localStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInInitial);
  const navigate = useNavigate();

  const authenticated = !!user;

  const handleLogin = (loginData) => {
    setUser(loginData.user);
    setIsLoggedIn(true);
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('user', JSON.stringify(loginData.user));
    navigate(ROUTES.TASKS);
  };

  const handleLogOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, handleLogin, handleLogOut, authenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
