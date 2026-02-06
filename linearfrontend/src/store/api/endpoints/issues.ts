import { apiSlice } from '../base'
import type { Issue, CreateIssueData } from '@/api/issue'

export const issuesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIssues: builder.query<Issue[], void>({
      query: () => '/issues/?limit=100',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Issue' as const, id })),
              { type: 'Issue', id: 'LIST' },
            ]
          : [{ type: 'Issue', id: 'LIST' }],
    }),
    getIssue: builder.query<Issue, string>({
      query: (id) => `/issues/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Issue', id }],
    }),
    createIssue: builder.mutation<Issue, CreateIssueData>({
      query: (body) => ({
        url: '/issues/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Issue', 'Dashboard'],
    }),
    updateIssue: builder.mutation<Issue, { id: string; data: Partial<CreateIssueData> }>({
      query: ({ id, data }) => ({
        url: `/issues/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Issue', id },
        'Dashboard',
        'Issue', // Invalidate list to update filters/sort
      ],
    }),
    deleteIssue: builder.mutation<void, string>({
      query: (id) => ({
        url: `/issues/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Issue', 'Dashboard'],
    }),
  }),
})

export const {
  useGetIssuesQuery,
  useGetIssueQuery,
  useCreateIssueMutation,
  useUpdateIssueMutation,
  useDeleteIssueMutation,
} = issuesApi
