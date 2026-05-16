import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { CvPreview } from '@/components/cv-preview'

export const metadata = {
  title: 'CV Preview | Portfolio',
  description: 'Preview and download my curriculum vitae',
}

export const dynamic = 'force-dynamic'

export default async function CvPage() {
  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Curriculum Vitae</h1>
          <p className="text-muted-foreground mt-2">Preview my CV directly in the browser.</p>
        </div>

        <CvPreview />
      </main>
    </div>
  )
}
