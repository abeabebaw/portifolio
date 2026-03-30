import Link from 'next/link'
import Image from 'next/image'
import { getProjects } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BackgroundModel } from '@/components/portfolio/background-model'
import { ThemeToggle } from '@/components/theme-toggle'
import { formatDisplayDate } from '@/lib/utils'
import { ArrowLeft, ExternalLink, Github, Star } from 'lucide-react'

export const metadata = {
  title: 'Projects | Portfolio',
  description: 'Browse all my projects and work',
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <BackgroundModel />
      <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
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

      <main className="container mx-auto px-4 max-w-6xl py-12">
        <div className="mb-12">
          <p className="inline-flex rounded-full panel-sheen px-4 py-1.5 text-sm font-mono text-primary mb-4">Project Gallery</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">All Projects</h1>
          <p className="text-muted-foreground text-lg">
            A collection of projects I&apos;ve worked on. Click on any project to learn more.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden panel-sheen rounded-2xl hover:border-primary/60 transition-all hover:-translate-y-1"
              >
                <Link href={`/projects/${project.id}`}>
                  <div className="relative aspect-video bg-secondary project-media-frame rounded-b-none border-x-0 border-t-0">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover project-image"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-muted-foreground">
                          {project.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors tracking-tight"
                    >
                      {project.name}
                    </Link>
                    <div className="flex items-center gap-1 shrink-0">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm project-description-text line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">
                    Added on {formatDisplayDate(project.createdAt)}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs font-mono">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
