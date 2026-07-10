import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository.js'
import { DomainError } from '../../domain/errors/DomainError.js'

export class DeleteWorkoutSessionUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(id: string): Promise<void> {
    const existingSession = await this.repository.findById(id)

    if (!existingSession) {
      throw new DomainError(
        `La session d'entraînement avec l'ID ${id} est introuvable.`,
        'id',
      )
    }

    await this.repository.delete(id)
  }
}
