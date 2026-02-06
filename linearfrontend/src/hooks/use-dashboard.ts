import { useGetDashboardStatsQuery } from '@/store/api/apiSlice'
import { useAppDispatch } from '@/store/hooks'
import { setDashboardStats } from '@/store/slices/dashboardSlice'
import { useEffect } from 'react'

/**
 * Custom hook to fetch and manage dashboard statistics
 * Uses RTK Query for server state and Redux for client state
 */
export const useDashboard = () => {
  const dispatch = useAppDispatch()

  const result = useGetDashboardStatsQuery()
  const { data } = result

  // Sync RTK Query data with Redux store
  useEffect(() => {
    if (data) {
      dispatch(setDashboardStats(data))
    }
  }, [data, dispatch])

  return result
}
