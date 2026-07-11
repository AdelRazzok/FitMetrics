import {
  CreateWorkoutSessionDTO,
  UpdateWorkoutSessionDTO,
  DashboardKPIsDTO,
  Activity,
} from '@fitmetrics/shared'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'
import { WorkoutSession } from '../../domain/entities/WorkoutSession'
import { prisma } from '../database/prisma'

export class SQLWorkoutSessionRepository implements WorkoutSessionRepository {
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

  async getDashboardKPIs(): Promise<DashboardKPIsDTO> {
    const aggregates = await prisma.workoutSession.aggregate({
      _count: { id: true },
      _sum: { durationInSeconds: true },
      _avg: { durationInSeconds: true },
    })

    const favoriteActivityGroup = await prisma.workoutSession.groupBy({
      by: ['activity'],
      _count: { id: true },
      orderBy: [{ _count: { id: 'desc' } }, { _max: { date: 'desc' } }],
      take: 1,
    })

    return {
      totalSessions: aggregates._count.id,
      totalDurationInSeconds: Math.round(
        aggregates._sum.durationInSeconds || 0,
      ),
      averageDurationInSeconds: Math.round(
        aggregates._avg.durationInSeconds || 0,
      ),
      favoriteActivity:
        favoriteActivityGroup.length > 0
          ? (favoriteActivityGroup[0].activity as Activity)
          : null,
    }
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
