import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index.ts";
import { ThemeProviderWrapper } from "./configs/providers/ThemeProviderWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderWrapper>
          <App />
        </ThemeProviderWrapper>
      </PersistGate>
    </Provider>
  </StrictMode>
);
