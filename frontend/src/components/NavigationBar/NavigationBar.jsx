import { ROUTES, navigationBarLinks } from '../../routes/consts';
import { useContext, useState } from 'react';

import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext/UserContext';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, isLoggedIn } = useContext(UserContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <nav className={styles.nav}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
          <div className={styles.menuLine}></div>
        </div>
        <ul
          className={showMenu ? `${styles.menu} ${styles.show}` : styles.menu}
        >
          {/* <div className={styles.logo}>
            <img src="../../src/assets/pictures/logo.png" alt="Logo" />
          </div> */}
          {navigationBarLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              {link.title}
            </Link>
          ))}
        </ul>
        <div>
          <div>Hello, {isLoggedIn ? user.name : 'Guest'}!</div>
          <Link to={ROUTES.LOGIN}>
            <Button>{isLoggedIn ? 'LogOut' : 'Login'}</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
