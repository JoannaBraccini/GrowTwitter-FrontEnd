// import { DefaultTheme } from "styled-components/dist/types";
import { DefaultTheme } from "styled-components";
import light from "../../assets/light.svg";

export const dark: DefaultTheme = {
  backgroundColor: "#24242c",
  textColor: "#eeeeee",
  textSecondary: "#95abc2",
  textExtra: "#c9c9c9",
  accent: "#4595e1",
  highlight: "#525157",
  toggle: `url(${light})`,
};
