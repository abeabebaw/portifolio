export interface Project {
  id: string
  name: string
  description: string
  longDescription?: string
  image: string
  liveDemo?: string
  github?: string
  technologies: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface OwnerProfile {
  name: string
  title: string
  bio: string
  email: string
  github?: string
  linkedin?: string
  twitter?: string
  profileImage?: string
  cvFilename?: string
  cvContentType?: string
  cvDataBase64?: string
  cvUploadedAt?: string
}

export interface CvAsset {
  filename: string
  contentType: string
  dataBase64: string
  uploadedAt: string
}
