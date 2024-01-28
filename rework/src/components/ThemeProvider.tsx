"use client";

import { ThemeContext } from "@/app/contexts/ThemeContext";
import Navbar from "./Navbar";
import useTheme from "@/app/hooks/useTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useTheme("light");
  return (
    <ThemeContext.Provider value={theme}>
      <Navbar theme={theme} setTheme={setTheme} />
      {children}
    </ThemeContext.Provider>
  );
}
