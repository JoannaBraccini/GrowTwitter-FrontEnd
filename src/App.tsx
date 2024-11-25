import { AppRoutes } from "./configs/routes/AppRoutes";
import { GlobalStyle } from "./configs/global/GlobalStyle";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isSignPage = location.pathname === "/sign";

  return (
    <>
      <AppRoutes />
      <GlobalStyle isSignPage={isSignPage} />
    </>
  );
}
export default App;
