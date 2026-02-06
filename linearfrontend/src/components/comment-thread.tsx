import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { MessageSquare } from 'lucide-react'
import { CommentForm } from '@/components/comment-form'
import { CommentItem } from '@/components/comment-item'
import {
  useComments,
  useCreateComment,
  useUpdateComment,
  useDeleteComment,
} from '@/hooks/use-comments'

interface CommentThreadProps {
  issueId: string
  currentUserId?: string
}

/**
 * Display comment thread for an issue
 */
export function CommentThread({ issueId, currentUserId }: CommentThreadProps) {
  const { data: comments, isLoading, error } = useComments(issueId)
  const createMutation = useCreateComment(issueId)
  const updateMutation = useUpdateComment(issueId)
  const deleteMutation = useDeleteComment(issueId)

  const handleCreate = async (content: string) => {
    await createMutation.mutate({ content })
  }

  const handleUpdate = async (commentId: string, content: string) => {
    await updateMutation.mutate({ commentId, content })
  }

  const handleDelete = async (commentId: string) => {
    await deleteMutation.mutate(commentId)
  }

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <CommentForm onSubmit={handleCreate} isSubmitting={createMutation.isPending} />

      {/* Comments List */}
      {comments && comments.length > 0 ? (
        <div className="space-y-0">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

function ErrorState({ error }: { error: unknown }) {
  const err = error as { data?: { message?: string }; message?: string }
  const message = err?.data?.message || err?.message || 'Unknown error'
  return (
    <Alert variant="destructive">
      <AlertDescription>Failed to load comments: {message}</AlertDescription>
    </Alert>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
      <p className="text-sm text-muted-foreground">No comments yet</p>
      <p className="text-xs text-muted-foreground mt-1">Be the first to comment!</p>
    </div>
  )
}
