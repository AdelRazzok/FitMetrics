import { ACTIVITY_LABELS } from '@fitmetrics/shared'
import { useDashboardKPIs } from '../hooks/useWorkoutQueries'

export const KPIGrid = () => {
  const { data: kpis, isLoading, isError } = useDashboardKPIs()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 bg-slate-200 animate-pulse rounded-xl border border-slate-100"
          />
        ))}
      </div>
    )
  }

  if (isError || !kpis) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
        Impossible de charger les statistiques.
      </div>
    )
  }

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return h > 0 ? `${h}h ${m.toString().padStart(2, '0')}m` : `${m}m`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">
          Nombre de sessions
        </h3>
        <p className="text-3xl font-bold mt-2">{kpis.totalSessions}</p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">Durée totale</h3>
        <p className="text-3xl font-bold mt-2 text-blue-600">
          {formatDuration(kpis.totalDurationInSeconds)}
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">Durée moyenne</h3>
        <p className="text-3xl font-bold mt-2 text-indigo-600">
          {formatDuration(kpis.averageDurationInSeconds)}
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-medium text-slate-500">
          Activité favorite
        </h3>
        <p className="text-3xl font-bold mt-2">
          {kpis.favoriteActivity
            ? ACTIVITY_LABELS[kpis.favoriteActivity]
            : 'Aucune'}
        </p>
      </div>
    </div>
  )
}
