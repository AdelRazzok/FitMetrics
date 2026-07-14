import { useWorkoutSessions } from '../hooks/useWorkoutQueries'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const SessionTable = () => {
  const { data: sessions, isLoading, isError } = useWorkoutSessions()

  if (isLoading) {
    return (
      <div className="h-64 border rounded-md bg-white flex items-center justify-center text-slate-500 animate-pulse">
        Chargement de l'historique...
      </div>
    )
  }

  if (isError || !sessions) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
        Impossible de charger les sessions d'entraînement.
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const formatDuration = (seconds: number) => {
    return `${Math.round(seconds / 60)} min`
  }

  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Titre</TableHead>
            <TableHead className="font-semibold">Activité</TableHead>
            <TableHead className="font-semibold">Durée</TableHead>
            <TableHead className="text-right font-semibold">
              Intensité
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-slate-500"
              >
                Aucun entraînement enregistré pour le moment.
              </TableCell>
            </TableRow>
          ) : (
            sessions.map((session) => (
              <TableRow key={session.id} className="hover:bg-slate-50/50">
                <TableCell className="text-slate-500">
                  {formatDate(session.date)}
                </TableCell>
                <TableCell className="font-medium text-slate-900">
                  {session.title}
                </TableCell>
                <TableCell className="capitalize">{session.activity}</TableCell>
                <TableCell>
                  {formatDuration(session.durationInSeconds)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {session.intensity ? (
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-800">
                      {session.intensity} / 10
                    </span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
