import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PropertySelectProps {
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string; color?: string }[]
  placeholder?: string
  disabled?: boolean
}

/**
 * Dropdown select component for issue properties
 */
export function PropertySelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  disabled = false,
}: PropertySelectProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder}>
          {selectedOption && (
            <div className="flex items-center gap-2">
              {selectedOption.color && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: selectedOption.color }}
                />
              )}
              <span>{selectedOption.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.color && (
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: option.color }} />
              )}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

// Status options with colors
export const STATUS_OPTIONS = [
  { value: 'backlog', label: 'Backlog', color: '#6B7280' },
  { value: 'todo', label: 'Todo', color: '#3B82F6' },
  { value: 'in_progress', label: 'In Progress', color: '#F59E0B' },
  { value: 'done', label: 'Done', color: '#10B981' },
  { value: 'canceled', label: 'Canceled', color: '#EF4444' },
]

// Priority options with colors
export const PRIORITY_OPTIONS = [
  { value: '0', label: 'No Priority', color: '#9CA3AF' },
  { value: '1', label: 'High', color: '#F87171' },
  { value: '2', label: 'Medium', color: '#FB923C' },
  { value: '3', label: 'Low', color: '#60A5FA' },
]
