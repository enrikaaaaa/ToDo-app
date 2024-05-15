import PropTypes from 'prop-types';
import { ROUTES } from '../../routes/consts';
import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : navigate(ROUTES.LOGIN)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
