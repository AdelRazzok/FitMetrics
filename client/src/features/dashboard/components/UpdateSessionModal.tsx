import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { useUpdateWorkoutSession } from '../hooks/useWorkoutQueries'
import { WorkoutSessionForm } from './WorkoutSessionForm'

interface UpdateSessionModalProps {
  session: any
}

export const UpdateSessionModal = ({ session }: UpdateSessionModalProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateSession, isPending, error } = useUpdateWorkoutSession()

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center h-8 w-8 cursor-pointer rounded-md text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        <Pencil className="h-4 w-4" />
        <span className="sr-only">Modifier {session.title}</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              Modifier l'entraînement
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <WorkoutSessionForm
              mode="update"
              isSubmitting={isPending}
              serverError={error ? error.message : null}
              defaultValues={{
                ...session,
                date: session.date.split('T')[0],
              }}
              onSubmit={(data) => {
                updateSession(
                  { id: session.id, data },
                  {
                    onSuccess: () => {
                      setIsOpen(false)
                    },
                  },
                )
              }}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
