"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useLayoutEffect } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY, prefersDark } from "@/lib/theme";

/**
 * Flips the `.dark` class on <html> and remembers the choice. Both icons are rendered and
 * CSS shows the right one, so server and client markup always match.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // themeInitScript sets the class before paint. In development, Strict Mode's remount resets
  // <html> attributes and drops it, so re-apply before paint. A no-op in production.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", prefersDark());
  }, []);

  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground-2 transition-colors hover:bg-surface-2 hover:cursor-pointer",
        className,
      )}
    >
      <DarkModeIcon aria-hidden className="dark:hidden" />
      <LightModeIcon aria-hidden className="hidden dark:block" />
    </button>
  );
}
