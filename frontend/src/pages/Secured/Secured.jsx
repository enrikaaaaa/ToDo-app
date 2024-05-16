import styles from './Secured.module.scss';
import { useNavigate } from 'react-router-dom';

const Secured = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <button
      type="button"
      className={styles.container}
      onClick={handleClick}
    ></button>
  );
};

export default Secured;
