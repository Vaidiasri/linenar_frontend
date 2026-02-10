import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Base API Slice Configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'Issue',
    'Project',
    'Team',
    'User',
    'Dashboard',
    'Comment',
    'Viewer',
    'Activity',
    'Cycle',
  ],
  endpoints: () => ({}),
})
