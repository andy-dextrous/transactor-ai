import { PostgresStore } from "@mastra/pg"
import { PgVector } from "@mastra/pg"

/*************************************************************************/
/*  SHARED DATABASE CONFIGURATION - MASTRA RECOMMENDED PATTERN
/*************************************************************************/

// Extract connection details from environment
// Use the pooler endpoint for Supabase (more reliable than direct connection)
const host = "aws-0-ap-southeast-2.pooler.supabase.com"
const port = 6543 // Pooler port, not the standard 5432
const user = "postgres.ajdmfpvkqnjyazkybmgg" // Supabase username includes project ID
const database = process.env.POSTGRES_DATABASE!
const password = process.env.POSTGRES_PASSWORD!

// Create a single shared PostgresStore instance using individual parameters
export const postgresStore = new PostgresStore({
  host,
  port,
  user,
  database,
  password,
})

// Create a single shared PgVector instance using connection string (this is fine for vector operations)
export const vectorStore = new PgVector({
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}`,
})

/*************************************************************************/
/*  VECTOR STORE INITIALIZATION
/*************************************************************************/

export async function initializeVectorStore() {
  try {
    // Create an index for document embeddings (1536 dimensions for OpenAI text-embedding-3-small)
    await vectorStore.createIndex({
      indexName: "document_embeddings",
      dimension: 1536,
      metric: "cosine",
      indexConfig: {
        type: "hnsw", // High-performance index for fast similarity search
        hnsw: {
          m: 16,
          efConstruction: 64,
        },
      },
    })

    console.log("✅ Vector store initialized successfully")
  } catch (error) {
    // Index might already exist, which is fine
    if (error instanceof Error && !error.message.includes("already exists")) {
      console.error("❌ Failed to initialize vector store:", error)
      throw error
    }
    console.log("✅ Vector store index already exists")
  }
}

/*************************************************************************/
/*  VECTOR OPERATIONS
/*************************************************************************/

export async function upsertDocuments(
  documents: Array<{
    id: string
    content: string
    embedding: number[]
    metadata?: Record<string, any>
  }>
) {
  const vectors = documents.map(doc => doc.embedding)
  const metadata = documents.map(doc => ({
    id: doc.id,
    content: doc.content,
    ...doc.metadata,
  }))
  const ids = documents.map(doc => doc.id)

  return await vectorStore.upsert({
    indexName: "document_embeddings",
    vectors,
    metadata,
    ids,
  })
}

export async function searchSimilarDocuments(
  queryEmbedding: number[],
  options: {
    topK?: number
    filter?: Record<string, any>
    minScore?: number
  } = {}
) {
  return await vectorStore.query({
    indexName: "document_embeddings",
    queryVector: queryEmbedding,
    topK: options.topK || 10,
    filter: options.filter,
    minScore: options.minScore || 0.7,
    includeVector: false,
  })
}
