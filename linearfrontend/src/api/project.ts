import api from './axios'

export interface Project {
  id: string
  name: string
  description: string | null
  team_id: string
}

export interface CreateProjectData {
  name: string
  description?: string
  team_id: string
}

export const getProjects = async () => {
  const response = await api.get<Project[]>('/projects/')
  return response.data
}

export const createProject = async (data: CreateProjectData) => {
  const response = await api.post<Project>('/projects/', data)
  return response.data
}

export const getProject = async (id: string) => {
  const response = await api.get<Project>(`/projects/${id}`)
  return response.data
}
