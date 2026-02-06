import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/store/api/apiSlice'
import type { UpdateUserData } from '@/api/user'

export const useUsers = () => {
  return useGetUsersQuery()
}

export const useUpdateUser = () => {
  const [updateUser, result] = useUpdateUserMutation()
  return {
    mutate: (variables: { id: string; data: UpdateUserData }) => updateUser(variables),
    ...result,
    isPending: result.isLoading,
  }
}

export const useDeleteUser = () => {
  const [deleteUser, result] = useDeleteUserMutation()
  return {
    mutate: deleteUser,
    ...result,
    isPending: result.isLoading,
  }
}
