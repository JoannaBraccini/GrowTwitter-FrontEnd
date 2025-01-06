import { useContext } from "react";
import { ThemeContext } from "../../configs/contexts/ThemeContext";

export function CloseIcon() {
  const { theme } = useContext(ThemeContext);
  const fillColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_59_1135"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#000000" />
      </mask>
      <g mask="url(#mask0_59_1135)">
        <path
          d="M4.14973 12.7762L3.22363 11.8501L7.07363 8.00007L3.22363 4.15007L4.14973 3.22397L7.99973 7.07397L11.8497 3.22397L12.7758 4.15007L8.92583 8.00007L12.7758 11.8501L11.8497 12.7762L7.99973 8.92617L4.14973 12.7762Z"
          fill={fillColor}
        />
      </g>
    </svg>
  );
}
