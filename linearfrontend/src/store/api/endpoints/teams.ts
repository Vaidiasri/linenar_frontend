import { apiSlice } from '../base'
import type { CreateTeamData, UpdateTeamData } from '@/api/team'
import type { Team } from '@/types/team'

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<Team[], void>({
      query: () => '/teams/',
      providesTags: ['Team'],
    }),
    createTeam: builder.mutation<Team, CreateTeamData>({
      query: (body) => ({
        url: '/teams/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Team'],
    }),
    updateTeam: builder.mutation<Team, { id: string; data: UpdateTeamData }>({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Team'],
    }),
    deleteTeam: builder.mutation<void, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Team'],
    }),
  }),
})

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi
