import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  isSubmitting?: boolean
}

/**
 * Form to create new comments
 * Supports Ctrl+Enter to submit
 */
export function CommentForm({ onSubmit, isSubmitting = false }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    if (!content.trim()) {
      setError('Comment cannot be empty')
      return
    }

    setError(null)

    try {
      await onSubmit(content.trim())
      setContent('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="rounded-lg border-2 border-border bg-card p-2 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          className="min-h-[180px] resize-y bg-background border-2 border-input focus:border-primary text-sm"
          disabled={isSubmitting}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !content.trim()} size="sm">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Comment
          </Button>
        </div>
      </form>
    </div>
  )
}
