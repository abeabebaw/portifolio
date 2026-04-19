import { access } from 'node:fs/promises'
import path from 'node:path'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download } from 'lucide-react'

export const metadata = {
  title: 'CV Preview | Portfolio',
  description: 'Preview and download my curriculum vitae',
}

async function hasCvFile(): Promise<boolean> {
  const cvPath = path.join(process.cwd(), 'public', 'cv.pdf')

  try {
    await access(cvPath)
    return true
  } catch {
    return false
  }
}

export default async function CvPage() {
  const cvAvailable = await hasCvFile()

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
              {cvAvailable && (
                <Button size="sm" asChild className="rounded-full px-5">
                  <a href="/cv.pdf" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">Curriculum Vitae</h1>
          <p className="text-muted-foreground mt-2">Preview my CV directly in the browser.</p>
        </div>

        {cvAvailable ? (
          <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur p-2 md:p-3">
            <iframe
              src="/cv.pdf"
              title="CV Preview"
              className="w-full h-[75vh] rounded-xl bg-background"
            />
          </div>
        ) : (
          <div className="rounded-2xl border border-border/70 bg-card/40 backdrop-blur p-8 md:p-10">
            <h2 className="text-xl font-semibold text-foreground mb-3">CV file not found</h2>
            <p className="text-muted-foreground mb-4">
              Add your CV as public/cv.pdf to enable in-browser preview and download.
            </p>
            <p className="text-sm text-muted-foreground">Expected path: public/cv.pdf</p>
          </div>
        )}
      </main>
    </div>
  )
}
