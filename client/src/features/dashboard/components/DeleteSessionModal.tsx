import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
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
import type { WorkoutSessionResponse } from '@/features/dashboard/api/workout-sessions-api'
import { useDeleteWorkoutSession } from '../hooks/useWorkoutQueries'

interface DeleteSessionModalProps {
  session: WorkoutSessionResponse
}

export const DeleteSessionModal = ({ session }: DeleteSessionModalProps) => {
  const { mutate: deleteSession, isPending } = useDeleteWorkoutSession()

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
        <Trash2 className="h-4 w-4 cursor-pointer" />
        <span className="sr-only">Supprimer {session.title}</span>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer l'entraînement ?</AlertDialogTitle>
          <AlertDialogDescription>
            Tu es sur le point de supprimer la session{' '}
            <span className="font-semibold text-slate-900">
              "{session.title}"
            </span>
            . Cette action est irréversible et retirera ces données de tes
            statistiques globales.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteSession(session.id, {
                onSuccess: () => {
                  toast.success('Session supprimée avec succès.', {
                    position: 'top-center',
                  })
                },
              })
            }
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isPending ? 'Suppression...' : 'Oui, supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
