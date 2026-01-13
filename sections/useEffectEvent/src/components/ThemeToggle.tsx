interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}

function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  return (
    <div className="theme-toggle">
      <label>
        Theme:
        <button
          onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
          className={`theme-button ${theme}`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </label>
    </div>
  )
}

export default ThemeToggle
