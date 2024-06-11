import { useContext, useState } from 'react';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { navigationBarLinks } from '../../routes/consts';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
  const { isLoggedIn, handleLogOut } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;


  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className={styles.hello}>
          <div>Hello, {isLoggedIn ? user && user.Name : 'Guest'}!</div>
          <Button
            className={`${styles.Button_root} ${
              isLoggedIn ? styles.LogOutButton_root : ''
            }`}
            onClick={isLoggedIn ? handleLogOut : handleLogOut}
          >
            {isLoggedIn ? 'LogOut' : 'LogOut'}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default NavigationBar;
