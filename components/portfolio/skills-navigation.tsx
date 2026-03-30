'use client'

import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Code2, Database, Wrench, Cloud, Layers3 } from 'lucide-react'

type SkillCategory = {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    icon: Layers3,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: Code2,
    skills: ['Node.js', 'Express', 'REST APIs', 'Auth', 'Server Actions'],
  },
  {
    key: 'database',
    label: 'Database',
    icon: Database,
    skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'Schema Design'],
  },
  {
    key: 'cloud',
    label: 'Cloud',
    icon: Cloud,
    skills: ['AWS', 'Docker', 'CI/CD', 'Deployment Pipelines'],
  },
  {
    key: 'tools',
    label: 'Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'Jira'],
  },
]

export function SkillsNavigation() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].key)

  const activeSkills = useMemo(() => {
    const match = skillCategories.find((category) => category.key === activeCategory)
    return match?.skills ?? []
  }, [activeCategory])

  return (
    <section id="skills" className="py-20 md:py-24 section-reveal">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <p className="inline-flex rounded-full panel-sheen px-4 py-1.5 text-sm font-mono text-primary mb-4">
            02. Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
            Capability Map
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my stack by domain and see where I bring the most value.
          </p>
        </div>

        <div className="panel-sheen rounded-3xl border border-border/70 p-4 md:p-5">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {skillCategories.map((category) => {
              const Icon = category.icon
              const isActive = category.key === activeCategory

              return (
                <button
                  key={category.key}
                  type="button"
                  onClick={() => setActiveCategory(category.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'border-primary/60 bg-primary/15 text-primary shadow-[0_8px_24px_-18px_rgba(0,0,0,0.9)]'
                      : 'border-border/70 text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              )
            })}
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeSkills.map((skill, index) => (
              <div
                key={skill}
                className="rounded-2xl border border-border/70 bg-card/65 px-4 py-3 text-sm text-foreground panel-sheen"
              >
                <p className="text-xs font-mono text-muted-foreground mb-1">Skill {String(index + 1).padStart(2, '0')}</p>
                <p className="font-medium tracking-tight">{skill}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <Badge variant="outline" className="rounded-full px-4 py-1.5 text-xs font-mono border-primary/30 text-primary/90">
              {activeSkills.length} Core Skills in this category
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
