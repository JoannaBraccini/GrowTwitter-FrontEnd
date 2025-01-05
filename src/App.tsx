import { AppRoutes } from "./configs/routes/AppRoutes";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { dark, light } from "./configs/themes";
import { useContext } from "react";
import { ThemeContext } from "./configs/contexts/ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}
export default App;
