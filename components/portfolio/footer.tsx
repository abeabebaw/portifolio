import { OwnerProfile } from '@/lib/types'
import { Github, Linkedin, Twitter } from 'lucide-react'

interface FooterProps {
  profile: OwnerProfile
}

export function Footer({ profile }: FooterProps) {
  return (
    <footer className="py-10 border-t border-border/70">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary/60"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary/60"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary/60"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground tracking-wide">
            Built by {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
