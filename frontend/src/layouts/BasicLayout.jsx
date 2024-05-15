import './BasicLayout.css';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import PropTypes from 'prop-types';

const BasicLayout = ({ children }) => {

  return (
   <>
      <NavigationBar />
     
      {children}
     
      </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
