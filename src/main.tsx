import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProviderRedux } from "./configs/providers/ThemeProviderWrapper.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderRedux>
          <App />
        </ThemeProviderRedux>
      </PersistGate>
    </Provider>
  </StrictMode>
);
