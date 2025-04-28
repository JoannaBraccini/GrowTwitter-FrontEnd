import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export function HomeFill() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light";
  const fillColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      fill={fillColor}
      width="34"
      height="34"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        fillRule="evenodd"
        points="192 0 0 153.6 0 384 149.333 384 149.333 256 234.667 256 234.667 384 384 384 384 153.6"
        transform="translate(64 64)"
      />
    </svg>
  );
}
