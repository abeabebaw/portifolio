import { getProjects, getFeaturedProjects, getOwnerProfile } from '@/lib/data'
import { Header } from '@/components/portfolio/header'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { SkillsNavigation } from '@/components/portfolio/skills-navigation'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'
import { BackgroundModel } from '@/components/portfolio/background-model'

export default async function HomePage() {
  const [profile, featuredProjects, allProjects] = await Promise.all([
    getOwnerProfile(),
    getFeaturedProjects(),
    getProjects(),
  ])

  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <BackgroundModel />
      <Header />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <SkillsNavigation />
        <ProjectsSection 
          featuredProjects={featuredProjects} 
          totalProjects={allProjects.length} 
        />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
