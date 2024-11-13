import { ThemeProvider } from "styled-components";
import { AppRoutes } from "./configs/routes/AppRoutes";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { lightTheme } from "./assets/Themes/Light";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppRoutes />
      <GlobalStyle />
    </ThemeProvider>
  );
}
export default App;
