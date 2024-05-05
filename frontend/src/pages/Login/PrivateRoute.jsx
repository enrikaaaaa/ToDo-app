import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigate("/login")
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;
