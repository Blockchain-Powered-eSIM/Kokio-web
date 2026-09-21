"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type LiveTheme = "light" | "dark";

const ThemeContext = createContext<{
  theme: LiveTheme;
  setTheme: (t: LiveTheme) => void;
}>({ theme: "light", setTheme: () => {} });

export function LiveThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<LiveTheme>("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="kokio-live" data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useLiveTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle() {
  const { theme, setTheme } = useLiveTheme();
  return (
    <div className="control-group">
      <span className="control-label">Theme</span>
      <div className="segmented">
        <button
          type="button"
          className={theme === "light" ? "active" : ""}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          type="button"
          className={theme === "dark" ? "active" : ""}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
