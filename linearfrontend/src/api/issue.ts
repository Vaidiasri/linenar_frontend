import apiClient from './axios'

export interface Issue {
  id: string
  title: string
  description?: string
  status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
  priority: 0 | 1 | 2 | 3
  team_id?: string
  project_id?: string
  assignee_id?: string
  assignee?: {
    id: string
    full_name: string | null
    email: string
    avatar_url: string | null
  }
}

export interface CreateIssueData {
  title: string
  description?: string
  status?: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
  priority?: 0 | 1 | 2 | 3
  team_id?: string
  project_id?: string
  assignee_id?: string
}

export const getIssues = async () => {
  const response = await apiClient.get<Issue[]>('/issues/')
  return response.data
}

export const createIssue = async (data: CreateIssueData) => {
  const response = await apiClient.post<Issue>('/issues/', data)
  return response.data
}
