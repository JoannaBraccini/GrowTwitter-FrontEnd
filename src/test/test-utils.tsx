import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { light } from "../configs/themes";
import { store } from "../store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {}

export function renderWithProviders(
  ui: React.ReactElement,
  renderOptions: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={light}>{children}</ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Wrapper para testes de hooks que precisam de providers
export function createWrapper(): React.FC<PropsWithChildren> {
  return ({ children }: PropsWithChildren): JSX.Element => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={light}>{children}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export * from "@testing-library/react";
