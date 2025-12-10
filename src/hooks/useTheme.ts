import { useEffect, useState, useCallback } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = stored || (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    applyTheme(initialTheme)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback((newTheme?: Theme) => {
    setTheme((prevTheme) => {
      const nextTheme = newTheme || (prevTheme === 'light' ? 'dark' : 'light')
      localStorage.setItem('theme', nextTheme)
      applyTheme(nextTheme)
      return nextTheme
    })
  }, [])

  return { theme, toggleTheme, mounted }
}

function applyTheme(theme: Theme) {
  const html = document.documentElement
  if (theme === 'dark') {
    html.classList.add('dark')
    html.style.colorScheme = 'dark'
  } else {
    html.classList.remove('dark')
    html.style.colorScheme = 'light'
  }
}
