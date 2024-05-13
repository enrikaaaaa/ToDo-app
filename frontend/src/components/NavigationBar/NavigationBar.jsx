import { useContext, useState } from 'react';

import Button from '../Button/Button';
import DarkModeToggleComponent from '../../components/DarkModeToggleComponent';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContexts/ThemeContexts';
import { UserContext } from '../../contexts/UserContext/UserContext';
import { navigationBarLinks } from '../../routes/consts';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const { darkMode } = useContext(ThemeContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleMenuItemClick = () => {
    setShowMenu(false);
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
            <li key={link.path} onClick={handleMenuItemClick}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.hello}>
          <div className={`container ${darkMode ? 'darkMode' : 'lightMode'}`}>
            <DarkModeToggleComponent />
          </div>
          <div>Hello, {isLoggedIn && user.Name}!</div>
          <Button $info onClick={isLoggedIn ? handleLogOut : handleLogOut}>
            {isLoggedIn ? 'LogOut' : 'LogOut'}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
