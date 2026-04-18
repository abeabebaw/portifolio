import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI 
if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}
const connectionUri: string = uri

const options = {
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS || 3000),
  connectTimeoutMS: Number(process.env.MONGODB_CONNECT_TIMEOUT_MS || 3000),
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient | null> | undefined
}

function createClientPromise(): Promise<MongoClient | null> {
  const client = new MongoClient(connectionUri, options)

  return client.connect().catch(() => null)
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = createClientPromise()
    }

    return global._mongoClientPromise
  }

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise()
  }

  return global._mongoClientPromise
}
