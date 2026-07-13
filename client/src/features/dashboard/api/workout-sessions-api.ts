import { apiClient } from '@/lib/api-client'
import type {
  DashboardKPIsDTO,
  CreateWorkoutSessionDTO,
  UpdateWorkoutSessionDTO,
} from '@fitmetrics/shared'

export interface WorkoutSessionResponse {
  id: string
  title: string
  activity: string
  durationInSeconds: number
  date: string
  intensity: number | null
}

const BASE_PATH = '/sessions'

export async function getDashboardKPIs(): Promise<DashboardKPIsDTO> {
  return apiClient<DashboardKPIsDTO>(`${BASE_PATH}/dashboard`)
}

export async function getWorkoutSessions(): Promise<WorkoutSessionResponse[]> {
  return apiClient<WorkoutSessionResponse[]>(BASE_PATH)
}

export async function createWorkoutSession(
  data: CreateWorkoutSessionDTO,
): Promise<WorkoutSessionResponse> {
  return apiClient<WorkoutSessionResponse>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateWorkoutSession({
  id,
  data,
}: {
  id: string
  data: UpdateWorkoutSessionDTO
}): Promise<WorkoutSessionResponse> {
  return apiClient<WorkoutSessionResponse>(`${BASE_PATH}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

export async function deleteWorkoutSession(id: string): Promise<void> {
  return apiClient<void>(`${BASE_PATH}/${id}`, {
    method: 'DELETE',
  })
}
