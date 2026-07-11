import fp from 'fastify-plugin'
import { SQLWorkoutSessionRepository } from '../../infrastructure/adapters/SQLiteWorkoutSessionAdapter'
import { GetAllWorkoutSessionsUseCase } from '../../application/use-cases/GetAllWorkoutSessionsUseCase'
import { CreateWorkoutSessionUseCase } from '../../application/use-cases/CreateWorkoutSessionUseCase'
import { UpdateWorkoutSessionUseCase } from '../../application/use-cases/UpdateWorkoutSessionUseCase'
import { DeleteWorkoutSessionUseCase } from '../../application/use-cases/DeleteWorkoutSessionUseCase'
import { GetDashboardKPIsUseCase } from '../../application/use-cases/GetDashboardKPIsUseCase'

export interface DIContainer {
  getAllWorkoutSessionsUseCase: GetAllWorkoutSessionsUseCase
  createSessionUseCase: CreateWorkoutSessionUseCase
  updateSessionUseCase: UpdateWorkoutSessionUseCase
  deleteSessionUseCase: DeleteWorkoutSessionUseCase
  getDashboardKPIsUseCase: GetDashboardKPIsUseCase
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
    deleteSessionUseCase: new DeleteWorkoutSessionUseCase(repository),
    getDashboardKPIsUseCase: new GetDashboardKPIsUseCase(repository),
  }

  fastify.decorate('di', container)
})
