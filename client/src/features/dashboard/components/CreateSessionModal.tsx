import { useState, type SyntheticEvent } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  type Activity,
  ACTIVITY_TYPES,
  ACTIVITY_LABELS,
} from '@fitmetrics/shared'
import { useCreateWorkoutSession } from '../hooks/useWorkoutQueries'

export const CreateSessionModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: createSession, isPending } = useCreateWorkoutSession()

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const durationInMinutes = Number(formData.get('duration'))

    const newSession = {
      title: String(formData.get('title')),
      activity: String(formData.get('activity')) as Activity,
      durationInSeconds: durationInMinutes * 60,
      date: String(formData.get('date')),
      intensity: formData.get('intensity')
        ? Number(formData.get('intensity'))
        : null,
    }

    createSession(newSession, {
      onSuccess: () => {
        setIsOpen(false)
      },
    })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>+ Nouvelle Session</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="font-semibold">
            Enregistrer un entraînement
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la séance *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Ex: WOD, Cardio, Sprint..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activité *</Label>
            <select
              id="activity"
              name="activity"
              className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              {ACTIVITY_TYPES.map((activity) => (
                <option key={activity} value={activity}>
                  {ACTIVITY_LABELS[activity]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={today}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée (min) *</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="1"
                placeholder="60"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intensity">Intensité (1-10)</Label>
            <Input
              id="intensity"
              name="intensity"
              type="number"
              min="1"
              max="10"
              placeholder="8"
            />
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
