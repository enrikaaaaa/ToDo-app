import { createContext, useState } from 'react';

import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedInInitial = !!localStorage.getItem('user');
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInInitial);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, handleLogin, handleLogOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
