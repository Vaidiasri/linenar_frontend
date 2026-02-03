import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Trash2, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EditableField } from '@/components/editable-field'
import { Comment } from '@/hooks/use-comments'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface CommentItemProps {
  comment: Comment
  currentUserId: string | undefined
  onUpdate: (id: string, content: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

/**
 * Check if current user can edit/delete comment
 */
function canModifyComment(comment: Comment, currentUserId: string | undefined): boolean {
  if (!currentUserId) return false
  return comment.author_id === currentUserId
}

/**
 * Individual comment display with inline editing
 */
export function CommentItem({ comment, currentUserId, onUpdate, onDelete }: CommentItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const canModify = canModifyComment(comment, currentUserId)

  const handleUpdate = async (newContent: string) => {
    await onUpdate(comment.id, newContent)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(comment.id)
    } catch (err) {
      setIsDeleting(false)
      throw err
    }
  }

  const displayName = comment.author.full_name || comment.author.email
  const relativeTime = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })

  return (
    <div className="flex gap-3 py-4 border-b last:border-0">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{displayName}</span>
          <span className="text-xs text-muted-foreground">{relativeTime}</span>
        </div>

        {/* Comment Body */}
        {canModify ? (
          <EditableField
            value={comment.content}
            onSave={handleUpdate}
            placeholder="Comment content..."
            multiline
            className="text-sm"
          />
        ) : (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{comment.content}</p>
        )}
      </div>

      {/* Actions */}
      {canModify && (
        <div className="shrink-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isDeleting}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this comment? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}
