'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, Eye, Settings } from 'lucide-react'
import { logoutAction } from '@/lib/actions'
import { ThemeToggle } from '@/components/theme-toggle'

export function AdminHeader() {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded-xl panel-sheen flex items-center justify-center">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">Admin Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
              <Link href="/" target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
            
            <form action={logoutAction}>
              <Button variant="ghost" size="sm" type="submit" className="rounded-full hover:bg-secondary/70">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
