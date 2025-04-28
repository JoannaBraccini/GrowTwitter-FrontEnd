import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    textColor: string;
    textSecondary: string;
    textExtra: string;
    accent: string;
    highlight: string;
    toggle: string;
  }
}
