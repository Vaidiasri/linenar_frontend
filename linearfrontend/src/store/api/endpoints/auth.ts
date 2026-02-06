import { apiSlice } from '../base'
import type { LoginPayload, RegisterPayload, AuthResponse } from '@/types/auth'
import type { User } from '@/types/user'

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (credentials) => {
        const formData = new FormData()
        formData.append('username', credentials.email)
        formData.append('password', credentials.password)
        return {
          url: '/auth/login',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Viewer', 'Issue', 'Dashboard'], // Reset state on login
    }),
    register: builder.mutation<User, RegisterPayload>({
      query: (data) => ({
        url: '/users/',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password,
          full_name: data.name,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authApi
