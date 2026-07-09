import { Activity } from '@fitmetrics/shared'

export interface WorkoutSession {
  id: string
  title: string
  activity: Activity
  durationInSeconds: number
  date: string
  intensity: number | null
}
