import { Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  useDeleteWorkoutSession,
  useWorkoutSessions,
} from '../hooks/useWorkoutQueries'

export const SessionTable = () => {
  const { data: sessions, isLoading, isError } = useWorkoutSessions()
  const { mutate: deleteSession } = useDeleteWorkoutSession()

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

                <TableCell className="text-center">
                  <AlertDialog>
                    <AlertDialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                      <span className="sr-only">Supprimer {session.title}</span>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Supprimer l'entraînement ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tu es sur le point de supprimer la session{' '}
                          <span className="font-semibold text-slate-900">
                            "{session.title}"
                          </span>
                          . Cette action est irréversible et retirera ces
                          données de tes statistiques globales.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteSession(session.id)}
                          className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                          Oui, supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
