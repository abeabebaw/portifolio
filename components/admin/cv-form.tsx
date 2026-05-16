'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { uploadCvAction, deleteCvAction } from '@/lib/actions'
import { CheckCircle, FileText, Trash2, Upload } from 'lucide-react'

interface CvFormProps {
  cvAvailable: boolean
}

export function CvForm({ cvAvailable }: CvFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasCv, setHasCv] = useState(cvAvailable)

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget

    setLoading(true)
    setError(null)
    setSuccess(null)

    const result = await uploadCvAction(new FormData(form))

    if (result?.error) {
      setError(result.error)
    } else {
      setHasCv(true)
      setSuccess('CV uploaded successfully')
      form.reset()
      router.refresh()
    }

    setLoading(false)
  }

  async function handleDelete() {
    setLoading(true)
    setError(null)
    setSuccess(null)

    const result = await deleteCvAction()
    if (result?.error) {
      setError(result.error)
    } else {
      setHasCv(false)
      setSuccess('CV removed successfully')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <Card className="panel-sheen rounded-2xl border-border/70">
      <CardHeader>
        <CardTitle className="tracking-tight">CV Settings</CardTitle>
        <CardDescription>
          Upload and manage the CV file used by the public CV page.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl border border-border/70 bg-card/40 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4" />
            <span>
              Current status: {hasCv ? 'CV is available at /api/cv' : 'No CV uploaded yet'}
            </span>
          </div>
          {hasCv && (
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link href="/cv" target="_blank">
                Preview Public CV Page
              </Link>
            </Button>
          )}
        </div>

        <form onSubmit={handleUpload} encType="multipart/form-data" className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="cvFile">Upload CV (PDF, max 10MB)</FieldLabel>
              <Input
                id="cvFile"
                name="cvFile"
                type="file"
                accept="application/pdf"
                required
              />
            </Field>
          </FieldGroup>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && (
            <p className="text-sm text-primary flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {success}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            {hasCv && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove CV
              </Button>
            )}
            <Button type="submit" disabled={loading} className="rounded-full px-6 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.9)] hover:scale-[1.02] transition-transform">
              <Upload className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : hasCv ? 'Replace CV' : 'Upload CV'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
