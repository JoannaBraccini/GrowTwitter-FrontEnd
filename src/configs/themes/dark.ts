import { DefaultTheme } from "styled-components/dist/types";
import light from "src/icons/light.svg";

export const dark: DefaultTheme = {
  backgroundColor: "#000000",
  textColor: "#ffffff",
  accent: "#1f1f1f",
  toggle: `url(${light})`,
};
