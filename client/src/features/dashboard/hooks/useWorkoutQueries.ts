import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDashboardKPIs,
  getWorkoutSessions,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession,
} from '../api/workout-sessions-api'

export const workoutKeys = {
  all: ['workouts'] as const,
  kpis: () => [...workoutKeys.all, 'kpis'] as const,
  sessions: () => [...workoutKeys.all, 'sessions'] as const,
}

export function useDashboardKPIs() {
  return useQuery({
    queryKey: workoutKeys.kpis(),
    queryFn: getDashboardKPIs,
  })
}

export function useWorkoutSessions() {
  return useQuery({
    queryKey: workoutKeys.sessions(),
    queryFn: getWorkoutSessions,
  })
}

export function useCreateWorkoutSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWorkoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.sessions() })
      queryClient.invalidateQueries({ queryKey: workoutKeys.kpis() })
    },
  })
}

export function useUpdateWorkoutSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateWorkoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.sessions() })
      queryClient.invalidateQueries({ queryKey: workoutKeys.kpis() })
    },
  })
}

export function useDeleteWorkoutSession() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWorkoutSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutKeys.sessions() })
      queryClient.invalidateQueries({ queryKey: workoutKeys.kpis() })
    },
  })
}
