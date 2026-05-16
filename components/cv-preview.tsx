'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

type PreviewState = 'loading' | 'available' | 'missing'

export function CvPreview() {
  const [state, setState] = useState<PreviewState>('loading')

  useEffect(() => {
    let active = true

    async function checkCv() {
      try {
        const response = await fetch('/api/cv', { cache: 'no-store' })

        if (!active) {
          return
        }

        setState(response.ok ? 'available' : 'missing')
      } catch {
        if (active) {
          setState('missing')
        }
      }
    }

    checkCv()

    return () => {
      active = false
    }
  }, [])

  if (state === 'loading') {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur p-8 md:p-10">
        <p className="text-sm text-muted-foreground">Checking for the latest CV file...</p>
      </div>
    )
  }

  if (state === 'missing') {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur p-8 md:p-10">
        <h2 className="text-xl font-semibold text-foreground mb-3">CV file not found</h2>
        <p className="text-muted-foreground mb-4">
          Upload a CV from the admin dashboard to enable in-browser preview and download.
        </p>
        <p className="text-sm text-muted-foreground">
          The public CV viewer only appears after a successful upload.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button size="sm" asChild className="rounded-full px-5">
          <a href="/api/cv" download>
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur p-2 md:p-3">
        <iframe
          src="/api/cv"
          title="CV Preview"
          className="w-full h-[75vh] rounded-xl bg-background"
        />
      </div>
    </div>
  )
}