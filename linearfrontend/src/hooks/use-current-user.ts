import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/axios'

interface CurrentUser {
  id: string
  email: string
  full_name: string | null
  is_active: boolean
  created_at: string
}

/**
 * Fetch current logged-in user
 */
const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const response = await apiClient.get('/users/me')
  return response.data
}

/**
 * Hook to get current logged-in user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}
