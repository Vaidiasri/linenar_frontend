import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
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

  const { data, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't refetch on component mount
    staleTime: Infinity, // Data is fresh until invalidated by WebSocket
  })

  // Sync TanStack Query data with Redux store
  useEffect(() => {
    if (data) {
      dispatch(setDashboardStats(data))
    }
  }, [data, dispatch])

  return { data, isLoading, error }
}
