import { useGetViewerQuery } from '@/store/api/apiSlice'

/**
 * Hook to get current logged-in user
 */
export const useCurrentUser = () => {
  return useGetViewerQuery()
}
