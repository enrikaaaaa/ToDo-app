import PropTypes from 'prop-types';
import styled from 'styled-components';

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('../assets/pictures/hero.jpeg') no-repeat center center;
  background-size: cover;
`;

const ShadowLayer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const AuthLayout = ({ children }) => {
  return (
    <Background>
      {children}
      <ShadowLayer />
    </Background>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
