import PropTypes from "prop-types";
import styles from "./AuthLayout.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.background}>
      {children}

      <div className={styles.shadowLayer} />
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
