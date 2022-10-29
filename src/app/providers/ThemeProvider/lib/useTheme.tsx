import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}
export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)
  const toggleTheme = () => {
    let newTheme: Theme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.BLACK
        break
      case Theme.BLACK:
        newTheme = Theme.DARK
        break
      default:
        newTheme = Theme.LIGHT
    }

    setTheme?.(newTheme)
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }
  return { theme: theme || Theme.LIGHT, toggleTheme }
}
