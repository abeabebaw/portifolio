'use server'

import { randomUUID } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createProject, updateProject, deleteProject, updateOwnerProfile, deleteCvAsset, upsertCvAsset } from './data'
import { verifyPassword, createSession, destroySession, isAuthenticated } from './auth'
import { Project, OwnerProfile } from './types'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_CV_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_CV_TYPES = new Set(['application/pdf'])

async function saveUploadedImage(file: File, targetDirectory: string): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('No image file was uploaded')
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Only JPG, PNG, WEBP, and GIF images are allowed')
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error('Image must be 5MB or smaller')
  }

  const arrayBuffer = await file.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')

  return `data:${file.type};base64,${base64}`
}

async function saveUploadedProjectImage(file: File): Promise<string> {
  return saveUploadedImage(file, 'projects')
}

async function saveUploadedProfileImage(file: File): Promise<string> {
  return saveUploadedImage(file, 'profile')
}

async function saveUploadedCv(file: File): Promise<void> {
  if (!file || file.size === 0) {
    throw new Error('No CV file was uploaded')
  }

  if (!ALLOWED_CV_TYPES.has(file.type)) {
    throw new Error('Only PDF files are allowed for CV upload')
  }

  if (file.size > MAX_CV_SIZE_BYTES) {
    throw new Error('CV must be 10MB or smaller')
  }

  await upsertCvAsset(file)
}

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = formData.get('password') as string
  
  if (!password) {
    return { error: 'Password is required' }
  }
  
  const isValid = await verifyPassword(password)
  
  if (!isValid) {
    return { error: 'Invalid password' }
  }
  
  await createSession()
  redirect('/admin')
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect('/login')
}

export async function createProjectAction(formData: FormData): Promise<{ error?: string; project?: Project }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const longDescription = formData.get('longDescription') as string
  const image = (formData.get('image') as string)?.trim()
  const imageFile = formData.get('imageFile') as File | null
  const liveDemo = formData.get('liveDemo') as string
  const github = formData.get('github') as string
  const technologiesStr = formData.get('technologies') as string
  const featured = formData.get('featured') === 'on'

  let imagePath = image
  if (imageFile && imageFile.size > 0) {
    try {
      imagePath = await saveUploadedProjectImage(imageFile)
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to upload image',
      }
    }
  }

  if (!name || !description || !imagePath) {
    return { error: 'Name, description, and an image URL or upload are required' }
  }

  const technologies = technologiesStr
    ? technologiesStr.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const project = await createProject({
    name,
    description,
    longDescription: longDescription || undefined,
    image: imagePath,
    liveDemo: liveDemo || undefined,
    github: github || undefined,
    technologies,
    featured,
  })

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/projects')
  
  return { project }
}

export async function updateProjectAction(id: string, formData: FormData): Promise<{ error?: string; project?: Project | null }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const longDescription = formData.get('longDescription') as string
  const image = (formData.get('image') as string)?.trim()
  const imageFile = formData.get('imageFile') as File | null
  const liveDemo = formData.get('liveDemo') as string
  const github = formData.get('github') as string
  const technologiesStr = formData.get('technologies') as string
  const featured = formData.get('featured') === 'on'

  let imagePath = image
  if (imageFile && imageFile.size > 0) {
    try {
      imagePath = await saveUploadedProjectImage(imageFile)
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to upload image',
      }
    }
  }

  if (!name || !description || !imagePath) {
    return { error: 'Name, description, and an image URL or upload are required' }
  }

  const technologies = technologiesStr
    ? technologiesStr.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const project = await updateProject(id, {
    name,
    description,
    longDescription: longDescription || undefined,
    image: imagePath,
    liveDemo: liveDemo || undefined,
    github: github || undefined,
    technologies,
    featured,
  })

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/projects')
  revalidatePath(`/projects/${id}`)
  
  return { project }
}

export async function deleteProjectAction(id: string): Promise<{ error?: string; success?: boolean }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  const success = await deleteProject(id)
  
  if (!success) {
    return { error: 'Project not found' }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/projects')
  
  return { success: true }
}

export async function updateProfileAction(formData: FormData): Promise<{ error?: string; profile?: OwnerProfile }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const title = formData.get('title') as string
  const bio = formData.get('bio') as string
  const email = formData.get('email') as string
  const github = formData.get('github') as string
  const linkedin = formData.get('linkedin') as string
  const twitter = formData.get('twitter') as string
  const profileImage = (formData.get('profileImage') as string)?.trim()
  const profileImageFile = formData.get('profileImageFile') as File | null

  let profileImagePath = profileImage
  if (profileImageFile && profileImageFile.size > 0) {
    try {
      profileImagePath = await saveUploadedProfileImage(profileImageFile)
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Failed to upload profile image',
      }
    }
  }

  if (!name || !title || !email) {
    return { error: 'Name, title, and email are required' }
  }

  const profile = await updateOwnerProfile({
    name,
    title,
    bio: bio || '',
    email,
    github: github || undefined,
    linkedin: linkedin || undefined,
    twitter: twitter || undefined,
    profileImage: profileImagePath || undefined,
  })

  revalidatePath('/')
  revalidatePath('/admin')
  
  return { profile }
}

export async function uploadCvAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  const cvFile = formData.get('cvFile') as File | null

  if (!cvFile || cvFile.size === 0) {
    return { error: 'Please select a PDF file to upload' }
  }

  try {
    await saveUploadedCv(cvFile)
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to upload CV',
    }
  }

  revalidatePath('/cv')
  revalidatePath('/admin')
  revalidatePath('/')

  return { success: true }
}

export async function deleteCvAction(): Promise<{ error?: string; success?: boolean }> {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return { error: 'Unauthorized' }
  }

  try {
    const removed = await deleteCvAsset()
    if (!removed) {
      return { error: 'CV file does not exist' }
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Failed to remove CV',
    }
  }

  revalidatePath('/cv')
  revalidatePath('/admin')
  revalidatePath('/')

  return { success: true }
}
