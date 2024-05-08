import { useContext, useState } from 'react';

import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { navigationBarLinks } from '../../routes/consts';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
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
          {navigationBarLinks.map((link) => (
            <li key={link.path}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div>
          <div>Hello, {isLoggedIn && user ? user.Name : 'Guest'}!</div>
          <Button $InfoButton onClick={isLoggedIn ? handleLogOut : null}>
            {isLoggedIn ? 'LogOut' : 'Login'}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
