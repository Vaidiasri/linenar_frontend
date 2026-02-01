import api from './axios'
import { User } from '@/types/user'

export interface UpdateUserData {
  name?: string
  avatar_url?: string
}

export const getUsers = async () => {
  const response = await api.get<User[]>('/users/')
  return response.data
}

export const getUser = async (id: string) => {
  const response = await api.get<User>(`/users/${id}`)
  return response.data
}

export const updateUser = async (id: string, data: UpdateUserData) => {
  const response = await api.put<User>(`/users/${id}`, data)
  return response.data
}

// Assuming an invite endpoint exists, or we just create users via registration for now.
// export const inviteUser = async (email: string) => { ... }

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`)
  return response.data
}
