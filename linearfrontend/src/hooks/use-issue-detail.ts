import { useGetIssueQuery } from '@/store/api/apiSlice'

/**
 * Custom hook to fetch and manage single issue data
 */
export const useIssueDetail = (id: string | undefined) => {
  return useGetIssueQuery(id!, {
    skip: !id,
  })
}
