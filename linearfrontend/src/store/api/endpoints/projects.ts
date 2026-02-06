import { apiSlice } from '../base'
import type { Project, CreateProjectData } from '@/api/project'

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => '/projects/',
      providesTags: ['Project'],
    }),
    getProject: builder.query<Project, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation<Project, CreateProjectData>({
      query: (body) => ({
        url: '/projects/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Project'],
    }),
  }),
})

export const { useGetProjectsQuery, useGetProjectQuery, useCreateProjectMutation } = projectsApi
