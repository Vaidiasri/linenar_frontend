import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDashboardStats } from '@/store/slices/dashboardSlice'
import { DashboardStats } from '@/types/dashboard'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

/**
 * Fetch dashboard statistics from backend
 */
const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/dashboard/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

/**
 * Custom hook to fetch and manage dashboard statistics
 * Uses TanStack Query for server state and Redux for client state
 */
export const useDashboard = () => {
  const dispatch = useAppDispatch()
  const refreshInterval = useAppSelector((state) => state.dashboard.refreshInterval)

  const query = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    refetchInterval: refreshInterval * 1000, // Convert to milliseconds
    staleTime: 10000, // Consider data stale after 10 seconds
    retry: 2,
  })

  // Sync TanStack Query data with Redux store
  useEffect(() => {
    if (query.data) {
      dispatch(setDashboardStats(query.data))
    }
  }, [query.data, dispatch])

  return query
}
