import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function BackIcon() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light"; // Usa "light" como fallback
  const fillColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_59_1109"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="19"
        height="19"
      >
        <rect
          x="19"
          y="19"
          width="19"
          height="19"
          transform="rotate(-180 19 19)"
          fill="#000000"
        />
      </mask>
      <g mask="url(#mask0_59_1109)">
        <path
          d="M7.91571 4.67598L8.88033 5.61609L5.62633 8.86536L15.9326 8.86536L15.9326 10.2138L5.62633 10.2138L8.90012 13.4876L7.9355 14.4229L3.04737 9.53957L7.91571 4.67598Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}
