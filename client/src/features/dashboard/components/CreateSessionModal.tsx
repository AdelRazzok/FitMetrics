import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useCreateWorkoutSession } from '../hooks/useWorkoutQueries'
import { WorkoutSessionForm } from './WorkoutSessionForm'

export const CreateSessionModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: createSession, isPending, error } = useCreateWorkoutSession()

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>+ Nouvelle Session</Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              Enregistrer un entraînement
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <WorkoutSessionForm
              mode="create"
              isSubmitting={isPending}
              serverError={error ? error.message : null}
              onSubmit={(data) => {
                createSession(data, {
                  onSuccess: () => {
                    setIsOpen(false)
                  },
                })
              }}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
