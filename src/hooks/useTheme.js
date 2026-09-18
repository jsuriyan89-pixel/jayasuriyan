import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved ? saved === 'dark' : true; // default dark
  });

  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('theme-accent') || 'cyan';
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.classList.add('dark');
      body.classList.remove('light-theme');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.add('light-theme');
      localStorage.setItem('theme-mode', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('theme-accent', accent);
  }, [accent]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return { isDark, toggleTheme, accent, setAccent };
}
