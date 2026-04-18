import { randomUUID } from 'node:crypto'
import { Collection, Document, ObjectId, OptionalId } from 'mongodb'
import { getMongoClient } from './mongodb'
import { OwnerProfile, Project } from './types'

interface ProjectDocument extends Document {
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

interface OwnerProfileDocument extends Document {
  key: 'owner-profile'
  name: string
  title: string
  bio: string
  email: string
  github?: string
  linkedin?: string
  twitter?: string
  profileImage?: string
}

const DATABASE_NAME = process.env.MONGODB_DB || 'myportfolio'
const PROJECTS_COLLECTION = 'projects'
const PROFILE_COLLECTION = 'profiles'
const PROFILE_KEY = 'owner-profile'
let seedPromise: Promise<void> | null = null
let mongoUnavailable = false

type LocalStore = {
  projects: Project[]
  profile: OwnerProfile
}

let localStore: LocalStore | null = null

const initialProjects: Omit<Project, 'id'>[] = [
  {
    name: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration',
    longDescription:
      'Built a complete e-commerce platform featuring product catalog, shopping cart, user authentication, and Stripe payment integration. Implemented real-time inventory tracking and order management system.',
    image: '/projects/demo.png',
    liveDemo: 'https://myecommercesystem.vercel.app/',
    github: 'https://github.com/abeabebaw/myecommercesystem',
    technologies: ['Next.js', 'javascript', 'CHAPA', 'PostgreSQL', 'Tailwind CSS'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'AI Code Assistant',
    description: 'An intelligent coding assistant powered by machine learning',
    longDescription:
      'Developed an AI-powered code assistant that provides intelligent code suggestions, bug detection, and automated refactoring. Uses natural language processing to understand developer intent.',
    image: '/projects/ai-assistant.jpg',
    liveDemo: 'https://example.com',
    github: 'https://github.com',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    name: 'Cloud Infrastructure Manager',
    description: 'A dashboard for managing cloud resources across providers',
    longDescription:
      'Created a unified dashboard for managing cloud infrastructure across AWS, GCP, and Azure. Features include resource monitoring, cost optimization, and automated scaling policies.',
    image: '/projects/cloud-manager.jpg',
    liveDemo: 'https://example.com',
    github: 'https://github.com',
    technologies: ['Go', 'React', 'Kubernetes', 'Terraform', 'GraphQL'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const initialProfile: OwnerProfile = {
  name: 'ABEBAW SHITA',
  title: 'Full-Stack Software Engineer',
  bio: 'I am a passionate software engineer with 5+ years of experience building web applications. I specialize in React, Node.js, and cloud technologies. I love creating elegant solutions to complex problems.',
  email: 'abebawshita04@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  profileImage: '/profile.png',
}

function createInitialLocalStore(): LocalStore {
  return {
    projects: initialProjects.map((project) => ({
      id: randomUUID(),
      ...project,
    })),
    profile: { ...initialProfile },
  }
}

function getLocalStore(): LocalStore {
  if (!localStore) {
    localStore = createInitialLocalStore()
  }

  return localStore
}

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((firstProject, secondProject) => secondProject.createdAt.localeCompare(firstProject.createdAt))
}

function cloneProject(project: Project): Project {
  return {
    ...project,
    technologies: [...project.technologies],
  }
}

function mapProfile(profile: OwnerProfile | null | undefined): OwnerProfile {
  if (!profile) {
    return { ...initialProfile }
  }

  return {
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    profileImage: profile.profileImage,
  }
}

function mapProject(doc: ProjectDocument): Project {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    longDescription: doc.longDescription,
    image: doc.image,
    liveDemo: doc.liveDemo,
    github: doc.github,
    technologies: doc.technologies || [],
    featured: Boolean(doc.featured),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }
}

function toObjectId(id: string): ObjectId | null {
  if (!ObjectId.isValid(id)) {
    return null
  }
  return new ObjectId(id)
}

async function getProjectsCollection(): Promise<Collection<ProjectDocument>> {
  if (mongoUnavailable) {
    throw new Error('MongoDB unavailable')
  }

  const client = await getMongoClient()
  if (!client) {
    throw new Error('MongoDB unavailable')
  }

  return client.db(DATABASE_NAME).collection<ProjectDocument>(PROJECTS_COLLECTION)
}

async function getProfileCollection(): Promise<Collection<OwnerProfileDocument>> {
  if (mongoUnavailable) {
    throw new Error('MongoDB unavailable')
  }

  const client = await getMongoClient()
  if (!client) {
    throw new Error('MongoDB unavailable')
  }

  return client.db(DATABASE_NAME).collection<OwnerProfileDocument>(PROFILE_COLLECTION)
}

async function tryGetProjectsCollection(): Promise<Collection<ProjectDocument> | null> {
  try {
    return await getProjectsCollection()
  } catch {
    mongoUnavailable = true
    return null
  }
}

async function tryGetProfileCollection(): Promise<Collection<OwnerProfileDocument> | null> {
  try {
    return await getProfileCollection()
  } catch {
    mongoUnavailable = true
    return null
  }
}

function ensureLocalSeedData(): void {
  const store = getLocalStore()

  if (store.projects.length === 0) {
    store.projects = initialProjects.map((project) => ({
      id: randomUUID(),
      ...project,
    }))
  }

  if (!store.profile) {
    store.profile = { ...initialProfile }
  }
}

async function ensureSeedData(): Promise<void> {
  if (mongoUnavailable) {
    ensureLocalSeedData()
    return
  }

  if (seedPromise) {
    return seedPromise
  }

  seedPromise = (async () => {
    const projectsCollection = await tryGetProjectsCollection()
    const profileCollection = await tryGetProfileCollection()

    if (!projectsCollection || !profileCollection) {
      ensureLocalSeedData()
      return
    }

    const [projectsCount, profile] = await Promise.all([
      projectsCollection.estimatedDocumentCount(),
      profileCollection.findOne({ key: PROFILE_KEY }),
    ])

    if (projectsCount === 0) {
      const seedProjects: OptionalId<ProjectDocument>[] = initialProjects.map((project) => ({
        ...project,
      }))
      await projectsCollection.insertMany(seedProjects)
    }

    if (!profile) {
      await profileCollection.insertOne({
        key: PROFILE_KEY,
        ...initialProfile,
      })
    }
  })().finally(() => {
    seedPromise = null
  })

  return seedPromise
}

export async function getProjects(): Promise<Project[]> {
  await ensureSeedData()
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    return sortProjects(getLocalStore().projects).map(cloneProject)
  }

  const projects = await collection.find({}).sort({ createdAt: -1 }).toArray()
  return projects.map(mapProject)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  await ensureSeedData()
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    return sortProjects(getLocalStore().projects.filter((project) => project.featured)).slice(0, 3).map(cloneProject)
  }

  const projects = await collection.find({ featured: true }).sort({ createdAt: -1 }).limit(3).toArray()
  return projects.map(mapProject)
}

export async function getProjectById(id: string): Promise<Project | null> {
  const objectId = toObjectId(id)
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    const project = getLocalStore().projects.find((entry) => entry.id === id)
    return project ? cloneProject(project) : null
  }

  if (!objectId) {
    return null
  }

  const project = await collection.findOne({ _id: objectId })
  return project ? mapProject(project) : null
}

export async function createProject(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
  const now = new Date().toISOString()
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    const project: Project = {
      id: randomUUID(),
      ...data,
      technologies: [...data.technologies],
      createdAt: now,
      updatedAt: now,
    }

    getLocalStore().projects = [project, ...getLocalStore().projects]
    return cloneProject(project)
  }

  const payload: OptionalId<ProjectDocument> = {
    ...data,
    createdAt: now,
    updatedAt: now,
  }

  const result = await collection.insertOne(payload)
  const project: Project = {
    id: result.insertedId.toString(),
    ...data,
    createdAt: now,
    updatedAt: now,
  }

  return project
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'createdAt'>>,
): Promise<Project | null> {
  const objectId = toObjectId(id)
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    const store = getLocalStore()
    const index = store.projects.findIndex((project) => project.id === id)

    if (index === -1) {
      return null
    }

    const updatedProject: Project = {
      ...store.projects[index],
      ...data,
      technologies: data.technologies ? [...data.technologies] : [...store.projects[index].technologies],
      updatedAt: new Date().toISOString(),
    }

    store.projects[index] = updatedProject
    return cloneProject(updatedProject)
  }

  if (!objectId) {
    return null
  }

  await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    },
  )

  const updated = await collection.findOne({ _id: objectId })
  return updated ? mapProject(updated) : null
}

export async function deleteProject(id: string): Promise<boolean> {
  const objectId = toObjectId(id)
  const collection = await tryGetProjectsCollection()

  if (!collection) {
    const store = getLocalStore()
    const beforeCount = store.projects.length
    store.projects = store.projects.filter((project) => project.id !== id)
    return store.projects.length !== beforeCount
  }

  if (!objectId) {
    return false
  }

  const result = await collection.deleteOne({ _id: objectId })
  return result.deletedCount === 1
}

export async function getOwnerProfile(): Promise<OwnerProfile> {
  await ensureSeedData()
  const collection = await tryGetProfileCollection()

  if (!collection) {
    return mapProfile(getLocalStore().profile)
  }

  const profile = await collection.findOne({ key: PROFILE_KEY })
  if (!profile) {
    return initialProfile
  }

  return {
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    profileImage: profile.profileImage,
  }
}

export async function updateOwnerProfile(data: Partial<OwnerProfile>): Promise<OwnerProfile> {
  const collection = await tryGetProfileCollection()

  if (!collection) {
    const store = getLocalStore()
    store.profile = {
      ...store.profile,
      ...data,
    }

    return mapProfile(store.profile)
  }

  await collection.updateOne(
    { key: PROFILE_KEY },
    {
      $set: {
        ...data,
      },
      $setOnInsert: {
        key: PROFILE_KEY,
      },
    },
    { upsert: true },
  )

  const profile = await collection.findOne({ key: PROFILE_KEY })
  if (!profile) {
    return initialProfile
  }

  return {
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    profileImage: profile.profileImage,
  }
}
