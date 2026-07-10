import { WorkoutSession } from '../../domain/entities/WorkoutSession'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'

export class GetAllWorkoutSessionsUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(): Promise<WorkoutSession[]> {
    const sessions = await this.repository.findAll()

    return sessions.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()

      return dateB - dateA
    })
  }
}
