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
  team?: {
    id: string
    name: string
    key: string
  }
  created_at: string
  updated_at: string
}

export interface Activity {
  id: string
  issue_id: string
  user_id: string
  user?: {
    id: string
    full_name: string | null
    email: string
    avatar_url: string | null
  }
  type: 'comment' | 'status_change' | 'priority_change' | 'assignee_change' | 'created'
  content: string // For comments
  old_value?: string
  new_value?: string
  created_at: string
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
  const response = await apiClient.get<Issue[]>('/issues/?limit=100')
  return response.data
}

export const createIssue = async (data: CreateIssueData) => {
  const response = await apiClient.post<Issue>('/issues/', data)
  return response.data
}

export const updateIssue = async (id: string, data: Partial<CreateIssueData>) => {
  const response = await apiClient.patch<Issue>(`/issues/${id}`, data)
  return response.data
}
