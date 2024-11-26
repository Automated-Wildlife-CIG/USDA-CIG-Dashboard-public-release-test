"use client";

import { useState, useEffect } from "react";
// import { Moon, Sun } from "lucide-react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ToggleDarkLight() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted && (
        <Button
          variant="ghost"
          aria-label="Toggle Theme"
          className="mr-6 flex justify-center items-center"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <LuSun className=" h-6 w-6  scale-0 transition-all  dark:scale-100" />
          ) : (
            <LuMoon className="h-6 w-6 scale-100 transition-all   dark:scale-0 " />
          )}

          <span className="sr-only">Toggle Theme</span>
        </Button>
      )}
    </div>
  );
}
