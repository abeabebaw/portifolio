import { access } from 'node:fs/promises'
import path from 'node:path'
import { getProjects, getOwnerProfile } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProjectsList } from '@/components/admin/projects-list'
import { ProfileForm } from '@/components/admin/profile-form'
import { CvForm } from '@/components/admin/cv-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

async function hasCvFile(): Promise<boolean> {
  const cvPath = path.join(process.cwd(), 'public', 'cv.pdf')

  try {
    await access(cvPath)
    return true
  } catch {
    return false
  }
}

export default async function AdminPage() {
  const [projects, profile, cvAvailable] = await Promise.all([getProjects(), getOwnerProfile(), hasCvFile()])

  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-xl grid-cols-3 panel-sheen rounded-full p-1">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="cv">CV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <ProjectsList projects={projects} />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileForm profile={profile} />
          </TabsContent>

          <TabsContent value="cv">
            <CvForm cvAvailable={cvAvailable} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
