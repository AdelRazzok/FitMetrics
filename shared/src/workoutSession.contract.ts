import { z } from 'zod'

export const ACTIVITY_TYPES = [
  'Running',
  'Swimming',
  'Weightlifting',
  'Cycling',
  'Yoga',
] as const

export type Activity = (typeof ACTIVITY_TYPES)[number]

export const createWorkoutSessionSchema = z.object({
  title: z
    .string('Le titre doit être une chaîne de caractères.')
    .min(1, 'Le titre est obligatoire.')
    .min(3, 'Le titre doit contenir au moins 3 caractères.')
    .max(50, 'Le titre ne doit pas dépasser 50 caractères.'),

  activity: z.enum(
    ACTIVITY_TYPES,
    "L'activité doit être une des valeurs suivantes : Running, Swimming, Weightlifting, Cycling, Yoga",
  ),

  durationInSeconds: z
    .int('La durée doit être un nombre entier.')
    .positive('La durée doit être une valeur positive.'),

  date: z.iso.date('La date doit être au format ISO valide (YYYY-MM-DD).'),

  intensity: z
    .int("L'intensité doit être un nombre entier.")
    .min(1, "L'intensité doit être strictement supérieure à 0.")
    .max(10, "L'intensité doit être inférieure ou égale à 10.")
    .optional()
    .nullable(),
})

export const updateWorkoutSessionSchema = createWorkoutSessionSchema.partial()

export type CreateWorkoutSessionDTO = z.infer<typeof createWorkoutSessionSchema>
export type UpdateWorkoutSessionDTO = z.infer<typeof updateWorkoutSessionSchema>
