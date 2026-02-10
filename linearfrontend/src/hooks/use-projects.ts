import { useGetProjectsQuery } from '@/store/api/endpoints/projects'

export const useProjects = () => {
  return useGetProjectsQuery()
}
