'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/70 shadow-[0_12px_28px_-24px_rgba(0,0,0,0.9)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 max-w-6xl">
        <div className="mt-3 flex h-14 items-center justify-between rounded-full border border-border/70 bg-background/60 px-4 md:px-5 backdrop-blur-xl panel-sheen">
          <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-secondary/60"
              >
                {item.name}
              </a>
            ))}
            <Link href="/projects">
              <Button variant="outline" size="sm" className="rounded-full border-primary/35 hover:border-primary/60 hover:bg-primary/10">
                All Projects
              </Button>
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-foreground rounded-full hover:bg-secondary/70"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 mt-2 border border-border/70 panel-sheen rounded-2xl">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors px-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link href="/projects" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  All Projects
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
