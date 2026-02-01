import { useState } from 'react'
import { Check, Loader2, Search } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useIssues, useUpdateIssue } from '@/hooks/use-issues'
import { User } from '@/types/user'
import { cn } from '@/lib/utils'

interface AssignIssueDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssignIssueDialog({ user, open, onOpenChange }: AssignIssueDialogProps) {
  const [search, setSearch] = useState('')
  const { data: issues, isLoading: isLoadingIssues } = useIssues()
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssue()

  const filteredIssues = issues?.filter((issue) =>
    issue.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleAssign = (issueId: string) => {
    if (!user) return

    updateIssue(
      { id: issueId, data: { assignee_id: String(user.id) } },
      {
        onSuccess: () => {
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Issue to {user?.full_name}</DialogTitle>
          <DialogDescription>Select an issue to assign to this user.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search issues..."
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 pl-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {isLoadingIssues ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : filteredIssues?.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No issues found.</div>
            ) : (
              filteredIssues?.map((issue) => (
                <div
                  key={issue.id}
                  className={cn(
                    'flex items-center justify-between rounded-md border p-2 text-sm hover:bg-muted/50 cursor-pointer transition-colors',
                    issue.assignee?.id === String(user?.id) && 'bg-muted'
                  )}
                  onClick={() => handleAssign(issue.id)}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{issue.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {issue.status} • {issue.priority}
                    </span>
                  </div>
                  {issue.assignee?.id === String(user?.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                  {isUpdating && <Loader2 className="h-3 w-3 animate-spin" />}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
