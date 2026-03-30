"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { formatExperiencePeriod, getExperienceDurationYears } from '@/lib/utils'

interface ExperienceItem {
  company: string
  title: string
  startYear: number
  endYear?: number
  url: string
  description: string[]
  skills: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: "TechCorp",
    title: "Senior Software Engineer",
    startYear: 2023,
    url: "https://techcorp.com",
    description: [
      "Lead development of customer-facing applications used by millions of users daily",
      "Architect and implement scalable microservices infrastructure on AWS",
      "Mentor junior developers and conduct technical interviews for new hires",
      "Collaborate with product managers and designers to ship new features",
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    company: "StartupXYZ",
    title: "Full Stack Developer",
    startYear: 2021,
    endYear: 2023,
    url: "https://startupxyz.com",
    description: [
      "Built and shipped multiple web applications from concept to production",
      "Developed RESTful APIs and GraphQL endpoints for mobile and web clients",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Contributed to open-source projects and company engineering blog",
    ],
    skills: ["Vue.js", "Python", "Django", "Docker", "MongoDB"],
  },
  {
    company: "AgencyPro",
    title: "Frontend Developer",
    startYear: 2019,
    endYear: 2021,
    url: "https://agencypro.com",
    description: [
      "Developed and maintained code for client websites using HTML, CSS, Sass, JavaScript, and jQuery",
      "Tested sites across multiple browsers and mobile devices for cross-browser compatibility",
      "Interfaced with clients on a weekly basis to provide progress updates",
      "Collaborated with designers to translate mockups into responsive web pages",
    ],
    skills: ["JavaScript", "React", "SCSS", "WordPress", "Figma"],
  },
  {
    company: "University Lab",
    title: "Research Assistant",
    startYear: 2017,
    endYear: 2019,
    url: "https://university.edu",
    description: [
      "Developed machine learning models for natural language processing research",
      "Published two papers in peer-reviewed academic conferences",
      "Created data visualization tools for analyzing research findings",
      "Assisted professors with undergraduate computer science courses",
    ],
    skills: ["Python", "TensorFlow", "NLTK", "Jupyter", "LaTeX"],
  },
]

export function Experience() {
  const [activeTab, setActiveTab] = useState(0)
  const activeExperience = experiences[activeTab]
  const periodLabel = formatExperiencePeriod(activeExperience.startYear, activeExperience.endYear)
  const yearsInRole = getExperienceDurationYears(activeExperience.startYear, activeExperience.endYear)

  return (
    <section id="experience" className="py-24 px-6 lg:px-12">
      <div className="container mx-auto max-w-3xl">
        <h2 className="flex items-center gap-4 text-2xl md:text-3xl font-bold text-foreground mb-12">
          <span className="text-primary font-mono text-xl">02.</span>
          Where I&apos;ve Worked
          <span className="hidden md:block h-px bg-border flex-1 max-w-xs" />
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-border">
            {experiences.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "px-4 py-3 text-sm font-mono whitespace-nowrap text-left transition-all",
                  "border-b-2 md:border-b-0 md:border-l-2 -mb-px md:mb-0 md:-ml-px",
                  activeTab === index
                    ? "text-primary border-primary bg-secondary/50"
                    : "text-muted-foreground border-transparent hover:text-primary hover:bg-secondary/30"
                )}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 min-h-[300px]">
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {activeExperience.title}{" "}
              <a
                href={activeExperience.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @ {activeExperience.company}
              </a>
            </h3>
            <p className="text-sm font-mono text-muted-foreground mb-6">
              {periodLabel} ({yearsInRole}+ year{yearsInRole > 1 ? 's' : ''})
            </p>
            <ul className="space-y-3">
              {activeExperience.description.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="text-primary mt-1.5 flex-shrink-0">▹</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-6">
              {activeExperience.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
