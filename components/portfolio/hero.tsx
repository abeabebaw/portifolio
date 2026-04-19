import { OwnerProfile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowDown, Sparkles, Rocket, Globe } from 'lucide-react'

interface HeroProps {
  profile: OwnerProfile
}

export function Hero({ profile }: HeroProps) {
  const focus = ['Product Design', 'Frontend Systems', 'API Architecture']
  const quickStats = [
    { label: 'Projects Delivered', value: '20+', icon: Rocket },
    { label: 'Modern Stack', value: 'React + Node', icon: Globe },
    { label: 'Build Philosophy', value: 'Quality First', icon: Sparkles },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 section-reveal">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[42vw] max-w-4xl max-h-105 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-1.5 text-primary font-mono mb-6 text-sm panel-sheen">
          <Sparkles className="h-3.5 w-3.5" />
          Available for freelance and full-time roles
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-3 text-balance leading-[0.9]">
          {profile.name}
        </h1>
        <h2 className="hero-title text-2xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground mb-7 text-balance leading-tight">
          <span className="hero-title-text hero-title-flip">{profile.title}</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-9 text-pretty leading-relaxed">
          {profile.bio}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {focus.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/70 px-3 py-1 text-xs md:text-sm text-muted-foreground bg-card/50 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8 shadow-[0_14px_34px_-18px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform">
            <a href="#projects">View My Work</a>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
            <a href="/cv" target="_blank" rel="noopener noreferrer">Preview CV</a>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/10">
            <a href={`mailto:${profile.email}`}>Get In Touch</a>
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {quickStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="panel-sheen rounded-2xl p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] inline-flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </p>
              <p className="text-foreground font-semibold mt-2">{value}</p>
            </div>
          ))}
        </div>
      </div>
      
      <a 
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce rounded-full p-2 border border-border/70 bg-card/50 icon-glow"
      >
        <ArrowDown className="h-6 w-6" />
      </a>
    </section>
  )
}
