import { useTeams } from '@/hooks/use-teams'
import { useUsers } from '@/hooks/use-users'
import { useGetProjectsQuery } from '@/store/api/endpoints/projects'
import { useGetCyclesQuery } from '@/store/api/endpoints/cycles'

export function useIssueFormData(selectedTeamId: string) {
  const { data: teams } = useTeams()
  const { data: users } = useUsers()
  const { data: projects } = useGetProjectsQuery()
  const { data: cycles } = useGetCyclesQuery(selectedTeamId, { skip: !selectedTeamId })

  // Filter projects by team, handling mixed ID types (string/number)
  const teamProjects = projects?.filter((p) => String(p.team_id) === String(selectedTeamId)) || []

  return {
    teams,
    users,
    projects,
    teamProjects,
    cycles,
  }
}
