import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getIssues, createIssue, updateIssue, CreateIssueData } from '@/api/issue'

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

export const useUpdateIssue = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateIssueData> }) =>
      updateIssue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })
}
