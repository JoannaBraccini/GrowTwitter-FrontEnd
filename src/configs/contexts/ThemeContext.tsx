import { createContext, useEffect, useState } from "react";

type TTheme = "light" | "dark";

interface ThemeContext {
  userName: string;
  theme: TTheme;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContext>({
  userName: "",
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<TTheme>(
    (localStorage.getItem("mode") as TTheme) ?? "light"
  );

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("mode", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ userName: "Joanna", theme: theme, toggleTheme: toggle }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
