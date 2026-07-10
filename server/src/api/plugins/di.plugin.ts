import fp from 'fastify-plugin'
import { SQLWorkoutSessionRepository } from '../../infrastructure/adapters/SQLiteWorkoutSessionAdapter'
import { GetAllWorkoutSessionsUseCase } from '../../application/use-cases/GetAllWorkoutSessionsUseCase'
import { CreateWorkoutSessionUseCase } from '../../application/use-cases/CreateWorkoutSessionUseCase'
import { UpdateWorkoutSessionUseCase } from '../../application/use-cases/UpdateWorkoutSessionUseCase'

export interface DIContainer {
  getAllWorkoutSessionsUseCase: GetAllWorkoutSessionsUseCase
  createSessionUseCase: CreateWorkoutSessionUseCase
  updateSessionUseCase: UpdateWorkoutSessionUseCase
}

declare module 'fastify' {
  interface FastifyInstance {
    di: DIContainer
  }
}

export const diPlugin = fp(async (fastify) => {
  const repository = new SQLWorkoutSessionRepository()

  const container: DIContainer = {
    getAllWorkoutSessionsUseCase: new GetAllWorkoutSessionsUseCase(repository),
    createSessionUseCase: new CreateWorkoutSessionUseCase(repository),
    updateSessionUseCase: new UpdateWorkoutSessionUseCase(repository),
  }

  fastify.decorate('di', container)
})
