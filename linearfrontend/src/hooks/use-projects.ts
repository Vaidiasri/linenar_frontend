import { useGetProjectsQuery } from '@/store/api/apiSlice'

export const useProjects = () => {
  return useGetProjectsQuery()
}
