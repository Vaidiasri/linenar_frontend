import { useQuery } from '@tanstack/react-query'
import linearClient from '../api/axios'
import { User } from '../types/user'

const fetchViewer = async (): Promise<User> => {
  const { data } = await linearClient.get<User>('/users/me')
  return data
}

export const useLinearViewer = () => {
  return useQuery({
    queryKey: ['viewer'],
    queryFn: fetchViewer,
  })
}
