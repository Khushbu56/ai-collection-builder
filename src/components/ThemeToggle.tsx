import { Moon, Sun, Image as ImageIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  const [showImages, setShowImages] = useState(true)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated || !mounted) {
    return (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {/* Image Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowImages(!showImages)}
        className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        title={showImages ? 'Hide images' : 'Show images'}
        aria-label="Toggle images"
      >
        <ImageIcon className="w-5 h-5" />
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleTheme()}
        className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.button>
    </div>
  )
}

export function useShowImages() {
  const [showImages, setShowImages] = useState(true)
  return { showImages, setShowImages }
}
