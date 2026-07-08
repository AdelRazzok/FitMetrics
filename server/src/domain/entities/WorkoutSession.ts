export type Activity =
  'Running' | 'Swimming' | 'Weightlifting' | 'Cycling' | 'Yoga'

export interface WorkoutSession {
  id: string
  title: string
  activity: Activity
  durationInSeconds: number
  date: string
  intensity: number | null
}

export type CreateWorkoutSessionDTO = Omit<WorkoutSession, 'id'>
export type UpdateWorkoutSessionDTO = Partial<CreateWorkoutSessionDTO>
