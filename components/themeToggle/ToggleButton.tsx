import React from "react";
import ThemeIcon from "./ThemeIcon";
import useDarkMode from "use-dark-mode";

export default function ToggleButton() {
  const darkMode = useDarkMode();
  return (
    <span
      style={{
        padding: "10px",
        cursor: "pointer",
        zIndex: 1,
        position: "relative",
      }}
      onClick={darkMode.toggle}
    >
      <ThemeIcon />
    </span>
  );
}
