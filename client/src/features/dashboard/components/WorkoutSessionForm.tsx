import { type SyntheticEvent } from 'react'
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  type Activity,
  type CreateWorkoutSessionDTO,
  ACTIVITY_TYPES,
  ACTIVITY_LABELS,
  createWorkoutSessionSchema,
} from '@fitmetrics/shared'

const { fieldContext, formContext } = createFormHookContexts()

const AppTextField = ({ field, label, type = 'text', placeholder }: any) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{label}</Label>
    <Input
      id={field.name}
      type={type}
      placeholder={placeholder}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
    />
    {field.state.meta.errors?.length > 0 && (
      <p className="text-xs text-red-500 font-medium">
        {field.state.meta.errors[0].message}
      </p>
    )}
  </div>
)

const AppSelectField = ({ field, label }: any) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{label}</Label>
    <select
      id={field.name}
      value={field.state.value}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value as Activity)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
    >
      {ACTIVITY_TYPES.map((activity) => (
        <option key={activity} value={activity}>
          {ACTIVITY_LABELS[activity]}
        </option>
      ))}
    </select>
    {field.state.meta.errors?.length > 0 && (
      <p className="text-xs text-red-500 font-medium">
        {field.state.meta.errors[0].message}
      </p>
    )}
  </div>
)

const AppDurationField = ({ field, label }: any) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{label}</Label>
    <Input
      id={field.name}
      type="number"
      min="1"
      placeholder="60"
      value={field.state.value ? field.state.value / 60 : ''}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.valueAsNumber * 60)}
    />
    {field.state.meta.errors?.length > 0 && (
      <p className="text-xs text-red-500 font-medium">
        {field.state.meta.errors[0].message}
      </p>
    )}
  </div>
)

const AppIntensityField = ({ field, label }: any) => (
  <div className="space-y-2">
    <Label htmlFor={field.name}>{label}</Label>
    <Input
      id={field.name}
      type="number"
      min="1"
      max="10"
      placeholder="8"
      value={field.state.value ?? ''}
      onBlur={field.handleBlur}
      onChange={(e) => {
        const val = e.target.value
        field.handleChange(val === '' ? null : Number(val))
      }}
    />
    {field.state.meta.errors?.length > 0 && (
      <p className="text-xs text-red-500 font-medium">
        {field.state.meta.errors[0].message}
      </p>
    )}
  </div>
)

const { useAppForm } = createFormHook({
  fieldComponents: {
    AppTextField,
    AppSelectField,
    AppDurationField,
    AppIntensityField,
  },
  formComponents: {},
  fieldContext,
  formContext,
})

interface WorkoutSessionFormProps {
  mode: 'create' | 'update'
  defaultValues?: Partial<CreateWorkoutSessionDTO>
  onSubmit: (data: CreateWorkoutSessionDTO) => void
  onCancel: () => void
  isSubmitting: boolean
  serverError?: string | null
}

export const WorkoutSessionForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  serverError,
}: WorkoutSessionFormProps) => {
  const today = new Date().toISOString().split('T')[0]

  const form = useAppForm({
    defaultValues: {
      title: defaultValues?.title ?? '',
      activity: defaultValues?.activity ?? ACTIVITY_TYPES[0],
      date: defaultValues?.date ?? today,
      durationInSeconds: defaultValues?.durationInSeconds ?? 3600,
      intensity: defaultValues?.intensity ?? undefined,
    } as CreateWorkoutSessionDTO,
    validators: {
      onChange: createWorkoutSessionSchema,
    },
    onSubmit: ({ value }) => {
      onSubmit(value)
    },
  })

  return (
    <form
      onSubmit={(e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className="space-y-4"
    >
      <form.AppField
        name="title"
        children={(field) => (
          <field.AppTextField
            field={field}
            label="Titre de la séance *"
            placeholder="Ex: WOD, Cardio..."
          />
        )}
      />

      <form.AppField
        name="activity"
        children={(field) => (
          <field.AppSelectField field={field} label="Activité *" />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <form.AppField
          name="date"
          children={(field) => (
            <field.AppTextField
              field={field}
              label="Date *"
              type="date"
              max={today}
            />
          )}
        />

        <form.AppField
          name="durationInSeconds"
          children={(field) => (
            <field.AppDurationField field={field} label="Durée (min) *" />
          )}
        />
      </div>

      <form.AppField
        name="intensity"
        children={(field) => (
          <field.AppIntensityField field={field} label="Intensité (1-10)" />
        )}
      />

      {serverError && (
        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md">
          {serverError}
        </div>
      )}

      <div className="pt-4 flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Annuler
        </Button>

        <form.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => (
            <Button type="submit" disabled={!canSubmit || isSubmitting}>
              {isSubmitting
                ? 'Enregistrement...'
                : mode === 'create'
                  ? 'Créer la session'
                  : 'Mettre à jour'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}
