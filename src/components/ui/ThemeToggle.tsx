import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches;
      setIsDark(newTheme);
      updateTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateTheme = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative h-10 w-16 rounded-full backdrop-blur-md bg-paper/10 dark:bg-paper-dark/10 
                border border-ink/10 dark:border-ink-dark/10 transition-colors duration-300
                hover:bg-paper/20 dark:hover:bg-paper-dark/20"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-1 flex items-center justify-between px-1">
        <Sun className="h-4 w-4 text-ink/70 dark:text-ink-dark/70 transition-all duration-300
                      group-hover:text-ink dark:group-hover:text-ink-dark" />
        <Moon className="h-4 w-4 text-ink/70 dark:text-ink-dark/70 transition-all duration-300
                       group-hover:text-ink dark:group-hover:text-ink-dark" />
      </div>
      <div
        className={`absolute left-1 top-1 h-8 w-8 rounded-full bg-sand dark:bg-teal
                   transform transition-transform duration-300 ${
                     isDark ? 'translate-x-6' : 'translate-x-0'
                   }`}
      />
    </button>
  );
}