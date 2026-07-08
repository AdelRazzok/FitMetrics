import {
  WorkoutSession,
  CreateWorkoutSessionDTO,
  UpdateWorkoutSessionDTO,
} from '../entities/WorkoutSession'

export interface WorkoutSessionRepository {
  findAll(): Promise<WorkoutSession[]>
  findById(id: string): Promise<WorkoutSession | null>
  create(data: CreateWorkoutSessionDTO): Promise<WorkoutSession>
  update(id: string, data: UpdateWorkoutSessionDTO): Promise<WorkoutSession>
  delete(id: string): Promise<void>
}
