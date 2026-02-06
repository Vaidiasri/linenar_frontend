import {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} from '@/store/api/apiSlice'

import type { UpdateTeamData } from '@/api/team'

export const useTeams = () => {
  return useGetTeamsQuery()
}

export const useCreateTeam = () => {
  const [createTeam, result] = useCreateTeamMutation()
  return {
    mutate: createTeam,
    ...result,
    isPending: result.isLoading,
  }
}

export const useUpdateTeam = () => {
  const [updateTeam, result] = useUpdateTeamMutation()
  return {
    mutate: (variables: { id: string; data: UpdateTeamData }) => updateTeam(variables),
    ...result,
    isPending: result.isLoading,
  }
}

export const useDeleteTeam = () => {
  const [deleteTeam, result] = useDeleteTeamMutation()
  return {
    mutate: deleteTeam,
    ...result,
    isPending: result.isLoading,
  }
}
