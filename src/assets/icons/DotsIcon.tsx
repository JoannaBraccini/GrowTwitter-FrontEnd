import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function DotsIcon() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light";
  const fillColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      fill={fillColor}
      width="24"
      height="24"
      viewBox="0 0 256 256"
      id="Flat"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="64" cy="128" r="18" />
        <circle cx="192" cy="128" r="18" />
        <circle cx="128" cy="128" r="18" />
      </g>
    </svg>
  );
}
