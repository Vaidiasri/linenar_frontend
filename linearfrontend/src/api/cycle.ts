import apiClient from './axios'

export interface Cycle {
  id: string
  name: string
  start_date: string
  end_date: string
  team_id: string
  is_active: boolean
  total_issues?: number
  completed_issues?: number
  created_at: string
  updated_at: string
}

export interface CreateCycleData {
  name: string
  start_date: string
  end_date: string
  team_id: string
}

export const getCycles = async (teamId: string) => {
  const response = await apiClient.get<Cycle[]>(`/cycles/?team_id=${teamId}`)
  return response.data
}

export const createCycle = async (data: CreateCycleData) => {
  const response = await apiClient.post<Cycle>('/cycles/', data)
  return response.data
}
