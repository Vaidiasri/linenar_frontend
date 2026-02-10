import { useParams, useNavigate } from 'react-router-dom'
import { useGetCycleQuery } from '@/store/api/endpoints/cycles'
import { useGetIssuesQuery } from '@/store/api/endpoints/issues'
import { KanbanBoard } from '@/components/KanbanBoard'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

export default function CycleDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: cycle, isLoading: loadingCycle } = useGetCycleQuery(id || '')

  // Fetch issues for this cycle (assuming filtering logic)
  // In a real app, we'd pass cycleId to getIssues or filter locally if getAll fetches everything
  // For now, let's filter client-side as we don't have a backend cycle filter yet
  const { data: allIssues, isLoading: loadingIssues } = useGetIssuesQuery()

  const cycleIssues = allIssues?.filter((issue) => issue.cycle_id === id) || []

  if (loadingCycle || loadingIssues) {
    return (
      <div className="p-4">
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  if (!cycle) {
    return <div className="p-4">Cycle not found</div>
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <header className="flex flex-col gap-2 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/cycles')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-semibold">{cycle.name}</h1>
          {cycle.is_active && (
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground ml-9">
          <Calendar className="h-3 w-3" />
          {format(new Date(cycle.start_date), 'MMM d')} -{' '}
          {format(new Date(cycle.end_date), 'MMM d, yyyy')}
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-4">
        <KanbanBoard issues={cycleIssues} />
      </div>
    </div>
  )
}
