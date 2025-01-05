import { DefaultTheme } from "styled-components/dist/types";
import dark from "src/icons/dark.svg";

export const light: DefaultTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  accent: "#4595e1",
  toggle: `url(${dark})`,
};
