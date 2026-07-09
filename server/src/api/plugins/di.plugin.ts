import fp from 'fastify-plugin'
import { SQLWorkoutSessionRepository } from '../../infrastructure/adapters/SQLiteWorkoutSessionAdapter'
import { CreateWorkoutSessionUseCase } from '../../application/use-cases/CreateWorkoutSessionUseCase'

export interface DIContainer {
  createSessionUseCase: CreateWorkoutSessionUseCase
}

declare module 'fastify' {
  interface FastifyInstance {
    di: DIContainer
  }
}

export const diPlugin = fp(async (fastify) => {
  const repository = new SQLWorkoutSessionRepository()

  const container: DIContainer = {
    createSessionUseCase: new CreateWorkoutSessionUseCase(repository),
  }

  fastify.decorate('di', container)
})
