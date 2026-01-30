import api from './axios'
import { Team } from '@/types/team'

export interface CreateTeamData {
  name: string
  key: string
}

export interface UpdateTeamData {
  name?: string
  key?: string
}

export const getTeams = async () => {
  const response = await api.get<Team[]>('/teams/')
  return response.data
}

export const createTeam = async (data: CreateTeamData) => {
  const response = await api.post<Team>('/teams/', data)
  return response.data
}

export const updateTeam = async (id: string, data: UpdateTeamData) => {
  const response = await api.put<Team>(`/teams/${id}`, data)
  return response.data
}

export const deleteTeam = async (id: string) => {
  const response = await api.delete(`/teams/${id}`)
  return response.data
}
