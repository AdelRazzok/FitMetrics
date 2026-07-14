import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import { Toaster } from '@/components/ui/sonner'
import { Dashboard } from '@/features/dashboard/Dashboard'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-center"></header>

          <main>
            <Dashboard />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  )
}
