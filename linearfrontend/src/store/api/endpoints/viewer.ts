import { apiSlice } from '../base'
import type { User } from '@/types/user'

export const viewerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getViewer: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['Viewer'],
    }),
  }),
})

export const { useGetViewerQuery } = viewerApi
