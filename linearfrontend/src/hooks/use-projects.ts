import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/api/project'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })
}
