import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Input.module.scss';

const Input = ({ className = '', ...props }) => {
  return <input className={classNames(styles.input, className)} {...props} />;
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
