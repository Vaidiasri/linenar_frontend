import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/axios'
import { Team } from '@/types/team'

export const useTeams = () => {
  return useQuery({
    queryKey: ['teams'],
    queryFn: async () => {
      const { data } = await apiClient.get<Team[]>('/teams/')
      return data
    },
  })
}
