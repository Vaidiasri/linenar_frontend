import { apiSlice } from '../base'
import type { Cycle, CreateCycleData } from '@/api/cycle'

export const cyclesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCycles: builder.query<Cycle[], string>({
      query: (teamId) => `/cycles/?team_id=${teamId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Cycle' as const, id })),
              { type: 'Cycle', id: 'LIST' },
            ]
          : [{ type: 'Cycle', id: 'LIST' }],
    }),
    getCycle: builder.query<Cycle, string>({
      query: (id) => `/cycles/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Cycle', id }],
    }),
    createCycle: builder.mutation<Cycle, CreateCycleData>({
      query: (body) => ({
        url: '/cycles/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cycle'],
    }),
  }),
})

export const { useGetCyclesQuery, useGetCycleQuery, useCreateCycleMutation } = cyclesApi
