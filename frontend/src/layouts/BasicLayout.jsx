import "./BasicLayout.css";
import "./DarkMode.css";

import DarkModeToggleComponent from "../../src/components/DarkModeToggleComponent";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import PropTypes from "prop-types";
import { ThemeContext } from "../contexts/ThemeContexts/ThemeContexts";
import { useContext } from "react";

const BasicLayout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div className={`container ${darkMode ? "darkMode" : "lightMode"}`}>
        <DarkModeToggleComponent />
        <NavigationBar />
        {children}
      </div>
    </>
  );
};

BasicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
