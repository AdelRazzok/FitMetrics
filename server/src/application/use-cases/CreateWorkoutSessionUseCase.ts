import { CreateWorkoutSessionDTO, ACTIVITY_TYPES } from '@fitmetrics/shared'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'
import { WorkoutSession, validateWorkoutSessionRules } from '../../domain/entities/WorkoutSession'

export class CreateWorkoutSessionUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(data: CreateWorkoutSessionDTO): Promise<WorkoutSession> {
    data.title = data.title.trim()

    validateWorkoutSessionRules(data)

    return this.repository.create(data)
  }
}
