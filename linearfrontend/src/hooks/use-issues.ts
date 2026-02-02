import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getIssues, createIssue, updateIssue, CreateIssueData, Issue } from '@/api/issue'

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
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['issues'] })

      // Snapshot the previous value
      const previousIssues = queryClient.getQueryData<Issue[]>(['issues'])

      // Optimistically update to the new value
      if (previousIssues) {
        queryClient.setQueryData<Issue[]>(['issues'], (old) => {
          if (!old) return []
          return old.map((issue) => (issue.id === id ? { ...issue, ...data } : issue))
        })
      }

      // Return a context object with the snapshotted value
      return { previousIssues }
    },
    onError: (_err, _newIssue, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousIssues) {
        queryClient.setQueryData(['issues'], context.previousIssues)
      }
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    },
  })
}
