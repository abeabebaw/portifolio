import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectById } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BackgroundModel } from '@/components/portfolio/background-model'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)
  
  if (!project) {
    return { title: 'Project Not Found' }
  }
  
  return {
    title: `${project.name} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <BackgroundModel />
      <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors">
              Portfolio
            </Link>
            <Button variant="outline" size="sm" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Projects
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-4xl py-12">
        {/* Project Image */}
        <div className="relative aspect-video bg-secondary mb-8 project-media-frame">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover project-image"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl font-bold text-muted-foreground">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-mono">
            <Calendar className="h-4 w-4" />
            <time dateTime={project.createdAt}>
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {project.featured && (
              <>
                <span className="mx-2">-</span>
                <Badge>Featured Project</Badge>
              </>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">{project.name}</h1>
          <p className="text-xl project-description-text">{project.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          {project.liveDemo && (
            <Button asChild className="rounded-full px-6 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform">
              <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live Demo
              </a>
            </Button>
          )}
          {project.github && (
            <Button variant="outline" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </a>
            </Button>
          )}
        </div>

        {/* Technologies */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Full Description */}
        {project.longDescription && (
          <div className="project-description-card p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">About This Project</h2>
            <p className="project-description-text whitespace-pre-wrap">
              {project.longDescription}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
