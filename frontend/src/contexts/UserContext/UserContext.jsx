import { createContext, useState } from "react";

import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user;

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogOut = () => {
    setUser(null);
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
