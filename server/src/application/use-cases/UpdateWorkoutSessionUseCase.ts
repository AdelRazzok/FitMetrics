import { UpdateWorkoutSessionDTO } from '@fitmetrics/shared'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'
import {
  WorkoutSession,
  validateWorkoutSessionRules,
} from '../../domain/entities/WorkoutSession'
import { DomainError } from '../../domain/errors/DomainError'

export class UpdateWorkoutSessionUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(
    id: string,
    data: UpdateWorkoutSessionDTO,
  ): Promise<WorkoutSession> {
    const existingSession = await this.repository.findById(id)

    if (!existingSession) {
      throw new DomainError(
        `La session d'entraînement avec l'ID ${id} est introuvable.`,
        'id',
      )
    }

    if (data.title) {
      data.title = data.title.trim()
    }
    validateWorkoutSessionRules(data)

    return this.repository.update(id, data)
  }
}
