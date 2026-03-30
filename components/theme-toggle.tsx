'use client'

import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

function animateThemeChange() {
  const root = document.documentElement
  root.classList.add('theme-switching')
  window.setTimeout(() => {
    root.classList.remove('theme-switching')
  }, 320)
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme = 'dark', setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('rounded-full border border-border/65 bg-background/55 backdrop-blur-xl', className)}
        aria-label="Toggle theme"
        disabled
      >
        <span className="h-4 w-4" />
      </Button>
    )
  }

  const setThemeWithAnimation = (nextTheme: 'light' | 'dark' | 'system') => {
    animateThemeChange()
    setTheme(nextTheme)
  }

  const currentTheme = theme === 'system' ? 'system' : theme === 'light' ? 'light' : 'dark'

  const nextTheme =
    currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light'

  const currentLabel =
    currentTheme === 'light' ? 'Light' : currentTheme === 'dark' ? 'Dark' : 'System'

  const nextLabel =
    nextTheme === 'light' ? 'Light' : nextTheme === 'dark' ? 'Dark' : 'System'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        'rounded-full border border-border/70 bg-background/60 backdrop-blur-xl transition-colors hover:bg-secondary/70',
        className,
      )}
      aria-label={`Theme: ${currentLabel}. Switch to ${nextLabel}`}
      title={`Theme: ${currentLabel} (click for ${nextLabel})`}
      onClick={() => setThemeWithAnimation(nextTheme)}
    >
      {currentTheme === 'light' && <Sun className="h-4 w-4" />}
      {currentTheme === 'dark' && <Moon className="h-4 w-4" />}
      {currentTheme === 'system' && <Monitor className="h-4 w-4" />}
    </Button>
  )
}
