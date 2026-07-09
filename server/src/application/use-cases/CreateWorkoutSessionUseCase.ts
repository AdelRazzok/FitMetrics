import { CreateWorkoutSessionDTO, ACTIVITY_TYPES } from '@fitmetrics/shared'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'
import { WorkoutSession } from '../../domain/entities/WorkoutSession'
import { DomainError } from '../../domain/errors/DomainError'

export class CreateWorkoutSessionUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(data: CreateWorkoutSessionDTO): Promise<WorkoutSession> {
    data.title = data.title.trim()

    if (data.title.length < 3 || data.title.length > 50) {
      throw new DomainError(
        'Le titre doit être compris entre 3 et 50 caractères.',
      )
    }

    if (!ACTIVITY_TYPES.includes(data.activity)) {
      throw new DomainError(`L'activité '${data.activity}' n'est pas valide.`)
    }

    if (
      data.durationInSeconds <= 0 ||
      !Number.isInteger(data.durationInSeconds)
    ) {
      throw new DomainError(
        'La durée doit être un nombre entier strictement positif.',
      )
    }

    const parsedDate = new Date(data.date)
    if (isNaN(parsedDate.getTime())) {
      throw new DomainError('Le format de la date est invalide.')
    }
    if (parsedDate > new Date()) {
      throw new DomainError('La date ne peut pas être dans le futur.')
    }

    if (data.intensity !== undefined && data.intensity !== null) {
      if (
        !Number.isInteger(data.intensity) ||
        data.intensity < 1 ||
        data.intensity > 10
      ) {
        throw new DomainError(
          "L'intensité doit être un entier compris entre 1 et 10.",
        )
      }
    }

    return this.repository.create(data)
  }
}
