import { DashboardKPIsDTO } from '@fitmetrics/shared'
import { WorkoutSessionRepository } from '../../domain/ports/WorkoutSessionRepository'

export class GetDashboardKPIsUseCase {
  constructor(private readonly repository: WorkoutSessionRepository) {}

  async execute(): Promise<DashboardKPIsDTO> {
    return this.repository.getDashboardKPIs()
  }
}
