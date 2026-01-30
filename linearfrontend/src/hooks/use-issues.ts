import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getIssues, createIssue, CreateIssueData } from '@/api/issue'

export type { Issue } from '@/api/issue'

export const useIssues = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
  })
}

export const useCreateIssue = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateIssueData) => createIssue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })
}
