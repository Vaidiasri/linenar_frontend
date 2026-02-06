import {
  useGetIssuesQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
} from '@/store/api/apiSlice'

import type { CreateIssueData } from '@/api/issue'

export type { Issue } from '@/api/issue'

export const useIssues = () => {
  return useGetIssuesQuery()
}

export const useCreateIssue = () => {
  const [createIssue, result] = useCreateIssueMutation()
  return {
    mutate: createIssue,
    ...result,
    isPending: result.isLoading, // Alias for TanStack compatibility
  }
}

export const useUpdateIssue = () => {
  const [updateIssue, result] = useUpdateIssueMutation()
  return {
    mutate: (variables: { id: string; data: Partial<CreateIssueData> }) => updateIssue(variables),
    ...result,
    isPending: result.isLoading,
  }
}
