import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'
import {
  WorkoutSession,
  CreateWorkoutSessionDTO,
  UpdateWorkoutSessionDTO,
  Activity,
} from '../../domain/entities/WorkoutSession'
import { prisma } from '../database/prisma'

export class PrismaWorkoutSessionAdapter implements WorkoutSessionRepository {
  async findAll(): Promise<WorkoutSession[]> {
    const sessions = await prisma.workoutSession.findMany()
    return sessions.map(this.mapToDomain)
  }

  async findById(id: string): Promise<WorkoutSession | null> {
    const session = await prisma.workoutSession.findUnique({ where: { id } })
    if (!session) return null
    return this.mapToDomain(session)
  }

  async create(data: CreateWorkoutSessionDTO): Promise<WorkoutSession> {
    const session = await prisma.workoutSession.create({
      data: {
        title: data.title,
        activity: data.activity,
        durationInSeconds: data.durationInSeconds,
        date: new Date(data.date),
        intensity: data.intensity,
      },
    })
    return this.mapToDomain(session)
  }

  async update(
    id: string,
    data: UpdateWorkoutSessionDTO,
  ): Promise<WorkoutSession> {
    const session = await prisma.workoutSession.update({
      where: { id },
      data: {
        title: data.title,
        activity: data.activity,
        durationInSeconds: data.durationInSeconds,
        date: data.date ? new Date(data.date) : undefined,
        intensity: data.intensity,
      },
    })
    return this.mapToDomain(session)
  }

  async delete(id: string): Promise<void> {
    await prisma.workoutSession.delete({ where: { id } })
  }

  private mapToDomain(prismaSession: any): WorkoutSession {
    return {
      id: prismaSession.id,
      title: prismaSession.title,
      activity: prismaSession.activity as Activity,
      durationInSeconds: prismaSession.durationInSeconds,
      date: prismaSession.date.toISOString(),
      intensity: prismaSession.intensity,
    }
  }
}
