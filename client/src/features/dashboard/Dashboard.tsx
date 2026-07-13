import { Button } from '@/components/ui/button'
import { KPIGrid } from './components/KPIGrid'
import { SessionTable } from './components/SessionTable'

export const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FitMetrics</h1>
          <p className="text-slate-500 mt-1">
            Analyse de tes performances sportives.
          </p>
        </div>

        <Button>+ Nouvelle Session</Button>
      </header>

      <section className="pb-4">
        <KPIGrid />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Historique des entraînements
        </h2>
        <SessionTable />
      </section>
    </div>
  )
}
