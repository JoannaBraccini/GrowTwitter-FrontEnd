import { AppRoutes } from "./configs/routes/AppRoutes";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { ThemeProviderWrapper } from "./configs/providers/ThemeProviderWrapper";

function App() {
  return (
    <ThemeProviderWrapper>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProviderWrapper>
  );
}
export default App;
