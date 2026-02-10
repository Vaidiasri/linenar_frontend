import { useGetCyclesQuery } from '@/store/api/endpoints/cycles'
import { useTeams } from '@/hooks/use-teams'
import { CreateCycleModal } from '@/components/create-cycle-modal'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Disc } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

export default function Cycles() {
  const { data: teams } = useTeams()
  // Assuming first team for now, similar to other pages
  const teamId = teams?.[0]?.id

  const { data: cycles, isLoading } = useGetCyclesQuery(teamId || '', {
    skip: !teamId,
  })

  // Sort cycles: Active first, then future, then past
  const sortedCycles = cycles
    ? [...cycles].sort((a, b) => {
        if (a.is_active && !b.is_active) return -1
        if (!a.is_active && b.is_active) return 1
        return new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
      })
    : []

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
        <h1 className="text-sm font-medium">Cycles</h1>
        <CreateCycleModal>
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            New Cycle
          </Button>
        </CreateCycleModal>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
            {sortedCycles.map((cycle) => (
              <Card key={cycle.id} className={cycle.is_active ? 'border-primary' : ''}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base font-medium">{cycle.name}</CardTitle>
                  {cycle.is_active && <Disc className="h-4 w-4 text-primary animate-pulse" />}
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mb-4">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(cycle.start_date), 'MMM d')} -{' '}
                    {format(new Date(cycle.end_date), 'MMM d')}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{
                          width: `${cycle.total_issues ? ((cycle.completed_issues || 0) / cycle.total_issues) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{cycle.completed_issues || 0} completed</span>
                      <span>{cycle.total_issues || 0} total</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {!cycles?.length && (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No cycles found. Create one to get started.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
