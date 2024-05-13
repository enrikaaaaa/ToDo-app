import DarkModeToggle from 'react-dark-mode-toggle';
import { ThemeContext } from '../../src/contexts/ThemeContexts/ThemeContexts';
import { useContext } from 'react';

const DarkModeToggleComponent = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <DarkModeToggle
      onChange={toggleDarkMode}
      checked={darkMode}
      size={40}
      speed={1.5}
    />
  );
};

export default DarkModeToggleComponent;
