'use client'

import { useState } from 'react'
import { OwnerProfile } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { updateProfileAction } from '@/lib/actions'
import { CheckCircle } from 'lucide-react'

interface ProfileFormProps {
  profile: OwnerProfile
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const result = await updateProfileAction(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <Card className="panel-sheen rounded-2xl border-border/70">
      <CardHeader>
        <CardTitle className="tracking-tight">Profile Settings</CardTitle>
        <CardDescription>
          Update your personal information displayed on the portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  defaultValue={profile.name}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="title">Job Title *</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="Software Engineer"
                  defaultValue={profile.title}
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                defaultValue={profile.email}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell visitors about yourself..."
                rows={4}
                defaultValue={profile.bio}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="profileImage">Profile Image URL</FieldLabel>
              <Input
                id="profileImage"
                name="profileImage"
                placeholder="/profile.jpg or https://..."
                defaultValue={profile.profileImage}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="profileImageFile">Upload Profile Image</FieldLabel>
              <Input
                id="profileImageFile"
                name="profileImageFile"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
              />
              <p className="text-xs text-muted-foreground">
                Choose a local image file to upload. If selected, it overrides the URL above.
              </p>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field>
                <FieldLabel htmlFor="github">GitHub URL</FieldLabel>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  placeholder="https://github.com/username"
                  defaultValue={profile.github}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="linkedin">LinkedIn URL</FieldLabel>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  defaultValue={profile.linkedin}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="twitter">Twitter URL</FieldLabel>
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  placeholder="https://twitter.com/username"
                  defaultValue={profile.twitter}
                />
              </Field>
            </div>
          </FieldGroup>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {success && (
            <p className="text-sm text-primary flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Profile updated successfully!
            </p>
          )}

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading} className="rounded-full px-6 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform">
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
