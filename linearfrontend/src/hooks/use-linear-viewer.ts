import { useQuery } from '@tanstack/react-query'
import linearClient from '../api/axios'
import { LinearViewerResponse } from '../types'

const fetchViewer = async () => {
  const query = `
    query {
      viewer {
        id
        name
        email
        avatarUrl
        timezone
      }
    }
  `

  const { data } = await linearClient.post<{ data: LinearViewerResponse }>('/graphql', { query })
  return data.data.viewer
}

export const useLinearViewer = () => {
  return useQuery({
    queryKey: ['viewer'],
    queryFn: fetchViewer,
  })
}
