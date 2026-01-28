import { useQuery } from '@tanstack/react-query'
import apiClient from '@/api/axios'
import type { User } from '@/types/user'

const fetchViewer = async (): Promise<User> => {
  const { data } = await apiClient.get<User>('/users/me')
  return data
}

export const useLinearViewer = () => {
  return useQuery({
    queryKey: ['viewer'],
    queryFn: fetchViewer,
  })
}
