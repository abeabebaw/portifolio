import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDisplayDate } from '@/lib/utils'
import { 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Sparkles, 
  FolderKanban,
  MoveUpRight,
  Code2,
  Eye
} from 'lucide-react'

interface ProjectsSectionProps {
  featuredProjects: Project[]
  totalProjects: number
}

export function ProjectsSection({ featuredProjects, totalProjects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden page-atmosphere">
      {/* Background Atmosphere - Using your custom classes */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-model-base" />
        <div className="bg-model-grid" />
        <div className="bg-model-ring" />
        <div className="bg-model-blob bg-model-blob-a" />
        <div className="bg-model-blob bg-model-blob-b" />
        <div className="bg-model-blob bg-model-blob-c" />
        <div className="bg-model-noise" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Using your animations */}
        <div className="text-center mb-16 md:mb-20 section-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-mono mb-6 border border-primary/20 backdrop-blur-sm">
            <Sparkles size={16} className="icon-glow" />
            <span>Featured Work</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-linear-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Selected Projects
            </span>
          </h2>
          
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A curated collection of my best work, showcasing my passion for 
            building exceptional digital experiences.
          </p>
        </div>

        {featuredProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-32 lg:space-y-40">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        {totalProjects > 0 && (
          <div className="relative text-center mt-24 lg:mt-32 section-reveal">
            <div className="absolute left-1/2 -translate-x-1/2 -top-12 w-px h-16 bg-linear-to-b from-transparent via-primary/30 to-transparent" />
            
            <Button
              asChild
              size="lg"
              className="group relative px-8 py-6 text-lg rounded-full bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105"
            >
              <Link href="/projects" className="flex items-center gap-3">
                <span>View All {totalProjects} Projects</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

function EmptyState() {
  return (
    <div className="relative text-center py-20 px-6 section-reveal">
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent rounded-3xl -z-10" />
      <FolderKanban className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6 animate-float" 
        style={{ animation: 'float-shift 6s ease-in-out infinite' }} 
      />
      <p className="text-muted-foreground text-lg">No featured projects yet.</p>
      <p className="text-sm text-muted-foreground/60 mt-2">Check back soon for updates!</p>
    </div>
  )
}

function ProjectCard({ project, index, isReversed }: { project: Project; index: number; isReversed: boolean }) {
  return (
    <div
      className="group section-reveal"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={`grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch ${isReversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="lg:col-span-7 relative min-h-80 md:min-h-105">
          <div className="project-media-frame w-full h-full rounded-3xl">
            <Link href={`/projects/${project.id}`} className="relative block w-full h-full">
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="project-image"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute left-5 right-5 bottom-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono bg-background/88 backdrop-blur-md rounded-full text-foreground border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1.5 text-xs font-mono bg-background/88 backdrop-blur-md rounded-full text-foreground border border-primary/20">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-linear-to-br from-card to-muted flex items-center justify-center">
                  <span className="text-6xl font-bold text-muted-foreground/30">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex">
          <div className="relative w-full panel-sheen rounded-3xl p-7 md:p-8 flex flex-col justify-between">
            <div className="space-y-5 text-left">
              <div className="inline-flex items-center gap-2 text-primary text-sm font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary icon-glow" />
                </span>
                Featured Project
              </div>

              <p className="text-xs text-muted-foreground font-mono">
                Added on {formatDisplayDate(project.createdAt)}
              </p>

              <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
                <Link
                  href={`/projects/${project.id}`}
                  className="hover:text-primary transition-colors duration-300 inline-block group/title"
                >
                  {project.name}
                  <span className="block max-w-0 group-hover/title:max-w-full transition-all duration-500 h-0.5 bg-linear-to-r from-primary to-accent mt-1" />
                </Link>
              </h3>

              <div className="project-description-card p-5 md:p-6">
                <p className="project-description-text text-sm md:text-base">
                  {project.longDescription || project.description}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="px-3 py-1.5 text-xs font-mono hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default border border-border/50"
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <Code2 className="h-3 w-3 mr-1 inline-block opacity-70" />
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                    aria-label="View source code on GitHub"
                  >
                    <Github className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                    aria-label="View live demo"
                  >
                    <Eye className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                  </a>
                )}
                <Link
                  href={`/projects/${project.id}`}
                  className="group/link p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-300"
                  aria-label="View project details"
                >
                  <MoveUpRight className="h-5 w-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}