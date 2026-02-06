import { useGetViewerQuery } from '@/store/api/apiSlice'

export const useLinearViewer = () => {
  return useGetViewerQuery()
}
