import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/axios'

interface IssueDetail {
  id: string
  title: string
  description: string | null
  status: string
  priority: number
  team_id: string | null
  project_id: string | null
  assignee_id: string | null
  creator_id: string
  created_at: string
  updated_at: string
  assignee: {
    id: string
    email: string
    full_name: string | null
  } | null
  team: {
    id: string
    name: string
  } | null
}

/**
 * Fetch single issue by ID
 */
const fetchIssueDetail = async (id: string): Promise<IssueDetail> => {
  const response = await apiClient.get(`/issues/${id}`)
  return response.data
}

/**
 * Custom hook to fetch and manage single issue data
 */
export const useIssueDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ['issue', id],
    queryFn: () => fetchIssueDetail(id!),
    enabled: !!id, // Only fetch if ID exists
    staleTime: 30000, // Consider data stale after 30 seconds
    retry: 2,
  })
}
