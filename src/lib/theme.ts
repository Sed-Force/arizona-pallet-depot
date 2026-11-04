export const THEME_STORAGE_KEY = "theme";

/** Saved choice if there is one, otherwise the OS preference. Mirrors themeInitScript. */
export function prefersDark() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved === "dark";
  } catch {
    // Storage unavailable; fall through to the OS preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

/**
 * Runs in <head> before first paint: applies the saved theme, or the OS preference when
 * nothing is saved, so the page never flashes the wrong theme. Keep it dependency-free.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`;
