import DarkModeToggle from "react-dark-mode-toggle";
import { ThemeContext } from "../contexts/ThemeContexts/ThemeContexts";
import { useContext } from "react";

const DarkModeToggleComponent = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <DarkModeToggle onChange={toggleDarkMode} checked={darkMode} size={60} />
  );
};

export default DarkModeToggleComponent;
