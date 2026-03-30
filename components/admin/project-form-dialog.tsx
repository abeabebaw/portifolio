'use client'

import { useState } from 'react'
import { Project } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createProjectAction, updateProjectAction } from '@/lib/actions'

interface ProjectFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit'
  project?: Project
}

export function ProjectFormDialog({ open, onOpenChange, mode, project }: ProjectFormDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    let result
    if (mode === 'edit' && project) {
      result = await updateProjectAction(project.id, formData)
    } else {
      result = await createProjectAction(formData)
    }

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Project' : 'Edit Project'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Fill in the details to add a new project to your portfolio.'
              : 'Update the project details.'}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Project Name *</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="My Awesome Project"
                defaultValue={project?.name}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Short Description *</FieldLabel>
              <Input
                id="description"
                name="description"
                placeholder="A brief description of your project"
                defaultValue={project?.description}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="longDescription">Full Description</FieldLabel>
              <Textarea
                id="longDescription"
                name="longDescription"
                placeholder="Detailed description of your project, technologies used, challenges solved..."
                rows={4}
                defaultValue={project?.longDescription}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Image URL</FieldLabel>
              <Input
                id="image"
                name="image"
                placeholder="/projects/my-project.jpg or https://..."
                defaultValue={project?.image}
              />
              <p className="text-xs text-muted-foreground">
                Optional when uploading a file below.
              </p>
            </Field>

            <Field>
              <FieldLabel htmlFor="imageFile">Upload Image From Device</FieldLabel>
              <Input
                id="imageFile"
                name="imageFile"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
              />
              <p className="text-xs text-muted-foreground">
                Upload JPG, PNG, WEBP, or GIF (max 5MB). Uploaded images are saved to /public/projects.
              </p>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="liveDemo">Live Demo URL</FieldLabel>
                <Input
                  id="liveDemo"
                  name="liveDemo"
                  type="url"
                  placeholder="https://myproject.com"
                  defaultValue={project?.liveDemo}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="github">GitHub URL</FieldLabel>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  placeholder="https://github.com/user/repo"
                  defaultValue={project?.github}
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="technologies">Technologies</FieldLabel>
              <Input
                id="technologies"
                name="technologies"
                placeholder="React, TypeScript, Node.js, PostgreSQL"
                defaultValue={project?.technologies.join(', ')}
              />
              <p className="text-xs text-muted-foreground">
                Separate technologies with commas
              </p>
            </Field>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="featured" 
                name="featured" 
                defaultChecked={project?.featured}
              />
              <label 
                htmlFor="featured" 
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Featured project (shown prominently on homepage)
              </label>
            </div>
          </FieldGroup>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading 
                ? (mode === 'create' ? 'Creating...' : 'Saving...') 
                : (mode === 'create' ? 'Create Project' : 'Save Changes')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
