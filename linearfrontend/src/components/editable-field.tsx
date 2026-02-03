import { useState, useRef, useEffect } from 'react'
import { Loader2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface EditableFieldProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  placeholder?: string
  multiline?: boolean
  className?: string
}

/**
 * Inline editable field component
 * Click to edit, auto-save on blur, escape to cancel
 */
export function EditableField({
  value,
  onSave,
  placeholder = 'Click to edit...',
  multiline = false,
  className = '',
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  // Reset edit value when prop value changes
  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = async () => {
    if (editValue.trim() === value.trim()) {
      setIsEditing(false)
      return
    }

    if (!editValue.trim()) {
      setError('Value cannot be empty')
      return
    }

    setIsSaving(true)
    setError(null)

    try {
      await onSave(editValue.trim())
      setIsEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel()
    }
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  if (!isEditing) {
    return (
      <div
        className={`group cursor-pointer hover:bg-muted/50 rounded px-2 py-1 transition-colors ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {value || <span className="text-muted-foreground italic">{placeholder}</span>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        {multiline ? (
          <Textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={className}
            rows={4}
            disabled={isSaving}
          />
        ) : (
          <Input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`h-auto py-1 ${className}`}
            disabled={isSaving}
          />
        )}
        <div className="flex items-center gap-1">
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={handleCancel}
                disabled={isSaving}
              >
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </>
          )}
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
