import { Activity, ACTIVITY_TYPES } from '@fitmetrics/shared'
import { DomainError } from '../errors/DomainError'

export interface WorkoutSession {
  id: string
  title: string
  activity: Activity
  durationInSeconds: number
  date: string
  intensity: number | null
}

export function validateWorkoutSessionRules(
  data: Partial<Omit<WorkoutSession, 'id'>>,
): void {
  if (data.title !== undefined) {
    const title = data.title.trim()
    if (title.length < 3 || title.length > 50) {
      throw new DomainError(
        'Le titre doit être compris entre 3 et 50 caractères.',
        'title',
      )
    }
  }

  if (data.activity !== undefined && !ACTIVITY_TYPES.includes(data.activity)) {
    throw new DomainError(
      "L'activité doit être une des valeurs suivantes : Running, Swimming, Weightlifting, Cycling, Yoga",
      'activity',
    )
  }

  if (data.durationInSeconds !== undefined) {
    if (
      data.durationInSeconds <= 0 ||
      !Number.isInteger(data.durationInSeconds)
    ) {
      throw new DomainError(
        'La durée doit être un nombre entier strictement positif.',
        'durationInSeconds',
      )
    }
  }

  if (data.date !== undefined) {
    const parsedDate = new Date(data.date)
    if (isNaN(parsedDate.getTime())) {
      throw new DomainError('Le format de la date est invalide.', 'date')
    }
    if (parsedDate > new Date()) {
      throw new DomainError('La date ne peut pas être dans le futur.', 'date')
    }
  }

  if (data.intensity !== undefined && data.intensity !== null) {
    if (
      !Number.isInteger(data.intensity) ||
      data.intensity < 1 ||
      data.intensity > 10
    ) {
      throw new DomainError(
        "L'intensité doit être un entier compris entre 1 et 10.",
        'intensity',
      )
    }
  }
}
