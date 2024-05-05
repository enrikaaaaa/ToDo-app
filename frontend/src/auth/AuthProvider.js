import { createContext, useContext } from "react";

import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
