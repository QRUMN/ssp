// Prevent flash of wrong theme
export function initializeTheme() {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.innerHTML = `
      (function() {
        const theme = localStorage.getItem('theme') ?? 'light';
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      })();
    `;
    document.head.appendChild(script);
  }
}
