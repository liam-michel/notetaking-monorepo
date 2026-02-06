//composition root

import pino from 'pino'

import { createUseCaseExecutor } from './common/error/error-utils.js'
import { createNotesUseCases } from './notes/notes.application.js'
import { createNotesRouter } from './server/routers/notes.js'
import { createTRPCRouter } from './server/routers/trpc.js'
import { createPrismaClient } from './storage/db-client.js'
import { createStorage } from './storage/storage.js'

export async function setupApp() {
  //instantiate router
  const t = createTRPCRouter()
  //instantiate logger
  const logger = pino({ level: 'info' })
  //database client
  const dbClient = createPrismaClient('postgresql://invalid:invalid@localhost:5432/invalid')
  //storage object initialized
  const storage = createStorage(dbClient)
  //use-case executor, to be used by all use-cases for consistent error handling
  const executor = createUseCaseExecutor({ logger })
  //notes use-case (to be used by TRPC router, and othes potentially)
  const notesUseCases = createNotesUseCases({ storage: storage, logger })
  //notes router, to be used in main app rotuer
  const notesRouter = createNotesRouter({ t, notesUseCases, executor })

  const appRouter = t.router({
    notes: notesRouter,
  })
  return {
    t,
    logger,
    appRouter,
  }
}
