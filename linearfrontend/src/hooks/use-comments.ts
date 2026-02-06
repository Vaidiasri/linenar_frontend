import {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/store/api/apiSlice'
import type { CommentCreate } from '@/types/comment'

// Exporting types for consumers if needed, though direct import is preferred
export type { Comment } from '@/types/comment'

/**
 * Hook to fetch all comments for an issue
 */
export const useComments = (issueId: string | undefined) => {
  return useGetCommentsQuery(issueId!, {
    skip: !issueId,
  })
}

/**
 * Hook to create a new comment
 */
export const useCreateComment = (issueId: string) => {
  const [createComment, result] = useCreateCommentMutation()

  return {
    mutate: (data: CommentCreate) => createComment({ issueId, data }),
    ...result,
    isPending: result.isLoading,
  }
}

/**
 * Hook to update a comment
 */
export const useUpdateComment = (issueId: string) => {
  const [updateComment, result] = useUpdateCommentMutation()

  return {
    mutate: (variables: { commentId: string; content: string }) =>
      updateComment({
        issueId,
        commentId: variables.commentId,
        data: { content: variables.content },
      }),
    ...result,
    isPending: result.isLoading,
  }
}

/**
 * Hook to delete a comment
 */
export const useDeleteComment = (issueId: string) => {
  const [deleteComment, result] = useDeleteCommentMutation()

  return {
    mutate: (commentId: string) => deleteComment({ issueId, commentId }),
    ...result,
    isPending: result.isLoading,
  }
}
