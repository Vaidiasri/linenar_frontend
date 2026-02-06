import { apiSlice } from '../base'
import type { Comment, CommentCreate } from '@/types/comment'

export const commentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], string>({
      query: (issueId) => `/issues/${issueId}/comments`,
      providesTags: (_result, _error, issueId) => [{ type: 'Comment', id: issueId }],
    }),
    createComment: builder.mutation<Comment, { issueId: string; data: CommentCreate }>({
      query: ({ issueId, data }) => ({
        url: `/issues/${issueId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { issueId }) => [{ type: 'Comment', id: issueId }],
    }),
    updateComment: builder.mutation<
      Comment,
      { issueId: string; commentId: string; data: CommentCreate }
    >({
      query: ({ issueId, commentId, data }) => ({
        url: `/issues/${issueId}/comments/${commentId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { issueId }) => [{ type: 'Comment', id: issueId }],
    }),
    deleteComment: builder.mutation<void, { issueId: string; commentId: string }>({
      query: ({ issueId, commentId }) => ({
        url: `/issues/${issueId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { issueId }) => [{ type: 'Comment', id: issueId }],
    }),
  }),
})

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi
