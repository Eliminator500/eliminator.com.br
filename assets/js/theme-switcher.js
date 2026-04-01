(function() {
  const themeStorageKey = 'mm_theme';
  const html = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      html.setAttribute('data-theme', theme);
    }
  };

  const getSavedTheme = () => {
    return localStorage.getItem(themeStorageKey) || 'system';
  };

  const saveTheme = (theme) => {
    localStorage.setItem(themeStorageKey, theme);
  };

  // Initial apply
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  // Expose to window for the toggle UI
  window.MM_THEME = {
    set: function(theme) {
      saveTheme(theme);
      applyTheme(theme);
    },
    get: getSavedTheme
  };

  // Listen for system changes if in system mode
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (getSavedTheme() === 'system') {
      applyTheme('system');
    }
  });

  // Wait for DOM to set the select value if it exists
  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('theme-selector');
    if (selector) {
      selector.value = getSavedTheme();
      selector.addEventListener('change', (e) => {
        window.MM_THEME.set(e.target.value);
      });
    }
  });

})();
