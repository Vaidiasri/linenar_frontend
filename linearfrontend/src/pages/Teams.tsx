import { useTeams } from '@/hooks/use-teams'
import { PageLayout } from '@/components/page-layout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CreateTeamSheet } from '@/components/CreateTeamSheet'

export default function Teams() {
  const { data: teams, isLoading, error } = useTeams()

  if (isLoading) return <div className="p-8">Loading teams...</div>
  if (error) return <div className="p-8 text-red-500">Error loading teams</div>

  return (
    <PageLayout title="Teams" action={<CreateTeamSheet />}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Your Teams</h2>
          <p className="text-sm text-muted-foreground">Manage teams and their members.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {teams?.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No teams found. Create one to get started.
          </div>
        )}
        {teams?.map((team) => (
          <Card key={team.id} className="hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>{team.key}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {team.projects?.length || 0} Projects
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  )
}
