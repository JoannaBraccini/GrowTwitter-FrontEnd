import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../themes";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/modules/settings/settingsSlice";
import { ThemeContext } from "../../context/ThemeContext";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.settings.mode);
  const theme = themeMode === "light" ? light : dark;

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ThemeContext.Provider
      value={{ theme: themeMode, toggleTheme: handleToggleTheme }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
