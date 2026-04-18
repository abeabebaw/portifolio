import Image from 'next/image'
import { OwnerProfile } from '@/lib/types'
import { getYearsOfExperience } from '@/lib/utils'

interface AboutProps {
  profile: OwnerProfile
}

export function About({ profile }: AboutProps) {
  const highlights = ['TypeScript First', 'Scalable UI Systems', 'API + DB Integration']
  const experienceStartYear = 2021
  const yearsOfExperience = getYearsOfExperience(experienceStartYear)
  const imageSrc = profile.profileImage === '/profile.jpg' ? '/profile.png' : (profile.profileImage || '/profile.png')

  return (
    <section id="about" className="py-24 section-reveal">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-semibold text-foreground mb-12 flex items-center gap-4 tracking-tight">
          <span className="text-primary font-mono text-xl">01.</span>
          About Me
          <span className="flex-1 h-px bg-border ml-4" />
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 items-start panel-sheen rounded-2xl p-6 md:p-8">
          <div className="md:col-span-2 space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.22em] text-primary">Who I Am</p>
            <p className="text-foreground/90 text-lg leading-relaxed">
              {profile.bio}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I enjoy building things that live on the internet. My interest in web development 
              started back when I decided to create my first website. That simple curiosity led me 
              down a rabbit hole of learning about HTML, CSS, and eventually the entire modern web stack.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, I focus on building accessible, inclusive products and digital experiences. 
              I am always eager to learn new technologies and improve my skills.
            </p>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary font-mono">
                {yearsOfExperience}+ Years Experience
              </span>
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-border/70 bg-card/45 px-3 py-1 text-xs text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative group mx-auto md:mx-0">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-border/60">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={profile.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-6xl font-bold text-muted-foreground">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 border border-primary/55 rounded-2xl translate-x-3 translate-y-3 -z-10 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" />
          </div>
        </div>
      </div>
    </section>
  )
}
