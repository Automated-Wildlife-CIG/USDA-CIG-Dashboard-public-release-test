"use client";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
