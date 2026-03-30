import { getProjects, getOwnerProfile } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-header'
import { ProjectsList } from '@/components/admin/projects-list'
import { ProfileForm } from '@/components/admin/profile-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function AdminPage() {
  const [projects, profile] = await Promise.all([getProjects(), getOwnerProfile()])

  return (
    <div className="min-h-screen bg-background page-atmosphere relative isolate overflow-hidden">
      <AdminHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 panel-sheen rounded-full p-1">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-6">
            <ProjectsList projects={projects} />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileForm profile={profile} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
