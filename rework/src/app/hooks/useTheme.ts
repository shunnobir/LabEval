import React, { useEffect, useState } from "react";

export type ThemeProp = "light" | "dark";

export default function useTheme(customTheme?: ThemeProp) {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<ThemeProp>(customTheme || "dark");

  useEffect(() => {
    const curTheme = localStorage.getItem("theme");
    if (curTheme && !loaded) {
      document.documentElement.classList.add(curTheme);
      setTheme(curTheme as ThemeProp);
    } else {
      if (curTheme && curTheme !== theme && loaded) {
        document.documentElement.classList.remove(curTheme);
      } else if (curTheme && curTheme === theme) {
        return;
      }
      localStorage.setItem("theme", theme);
      document.documentElement.classList.add(theme);
    }
    setLoaded(true);
  }, [theme, loaded]);

  return [theme, setTheme] as const;
}
