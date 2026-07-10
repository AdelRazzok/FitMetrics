import fp from 'fastify-plugin'
import { SQLWorkoutSessionRepository } from '../../infrastructure/adapters/SQLiteWorkoutSessionAdapter'
import { CreateWorkoutSessionUseCase } from '../../application/use-cases/CreateWorkoutSessionUseCase'
import { GetAllWorkoutSessionsUseCase } from '../../application/use-cases/GetAllWorkoutSessionsUseCase'

export interface DIContainer {
  createSessionUseCase: CreateWorkoutSessionUseCase
  getAllWorkoutSessionsUseCase: GetAllWorkoutSessionsUseCase
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
    getAllWorkoutSessionsUseCase: new GetAllWorkoutSessionsUseCase(repository),
  }

  fastify.decorate('di', container)
})
