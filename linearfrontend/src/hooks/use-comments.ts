import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../api/axios'

// Type definitions
interface CommentUser {
  id: string
  email: string
  full_name: string | null
}

export interface Comment {
  id: string
  content: string
  issue_id: string
  author_id: string
  created_at: string
  author: CommentUser
}

interface CommentCreate {
  content: string
}

/**
 * Fetch all comments for an issue
 */
const fetchComments = async (issueId: string): Promise<Comment[]> => {
  const response = await apiClient.get(`/issues/${issueId}/comments`)
  return response.data
}

/**
 * Create a new comment
 */
const createComment = async (issueId: string, data: CommentCreate): Promise<Comment> => {
  const response = await apiClient.post(`/issues/${issueId}/comments`, data)
  return response.data
}

/**
 * Update an existing comment
 */
const updateComment = async (
  issueId: string,
  commentId: string,
  data: CommentCreate
): Promise<Comment> => {
  const response = await apiClient.put(`/issues/${issueId}/comments/${commentId}`, data)
  return response.data
}

/**
 * Delete a comment
 */
const deleteComment = async (issueId: string, commentId: string): Promise<void> => {
  await apiClient.delete(`/issues/${issueId}/comments/${commentId}`)
}

/**
 * Hook to fetch all comments for an issue
 */
export const useComments = (issueId: string | undefined) => {
  return useQuery({
    queryKey: ['comments', issueId],
    queryFn: () => fetchComments(issueId!),
    enabled: !!issueId,
    staleTime: 30000,
  })
}

/**
 * Hook to create a new comment
 */
export const useCreateComment = (issueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CommentCreate) => createComment(issueId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', issueId] })
    },
  })
}

/**
 * Hook to update a comment
 */
export const useUpdateComment = (issueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: string; content: string }) =>
      updateComment(issueId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', issueId] })
    },
  })
}

/**
 * Hook to delete a comment
 */
export const useDeleteComment = (issueId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(issueId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', issueId] })
    },
  })
}
