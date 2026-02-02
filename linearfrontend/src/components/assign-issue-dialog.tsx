import { useState, useMemo } from 'react'
import { Check, Loader2, Search, Filter } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useIssues, useUpdateIssue } from '@/hooks/use-issues'
import { useProjects } from '@/hooks/use-projects'
import { useTeams } from '@/hooks/use-teams'
import { User } from '@/types/user'
import { cn } from '@/lib/utils'

interface AssignIssueDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'done':
      return 'bg-green-500/10 text-green-600'
    case 'in_progress':
      return 'bg-orange-500/10 text-orange-600'
    default:
      return 'bg-blue-500/10 text-blue-600'
  }
}

export function AssignIssueDialog({ user, open, onOpenChange }: AssignIssueDialogProps) {
  const [search, setSearch] = useState('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all')
  const [selectedTeamId, setSelectedTeamId] = useState<string>('all')

  const { data: issues, isLoading: isLoadingIssues } = useIssues()
  const { data: projects } = useProjects()
  const { data: teams } = useTeams()
  const { mutate: updateIssue, isPending: isUpdating } = useUpdateIssue()

  const filteredIssues = useMemo(() => {
    if (!issues) return []
    return issues.filter((issue) => {
      const matchesSearch = issue.title.toLowerCase().includes(search.toLowerCase())
      const matchesProject = selectedProjectId === 'all' || issue.project_id === selectedProjectId
      const matchesTeam = selectedTeamId === 'all' || issue.team_id === selectedTeamId
      return matchesSearch && matchesProject && matchesTeam
    })
  }, [issues, search, selectedProjectId, selectedTeamId])

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Issue to {user?.full_name}</DialogTitle>
          <DialogDescription>Filter by Project or Team to find the right issue.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams?.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
            ) : filteredIssues.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                <Filter className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No issues found matching filters.</p>
              </div>
            ) : (
              filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  className={cn(
                    'flex items-center justify-between rounded-md border p-3 text-sm hover:bg-muted/50 cursor-pointer transition-colors',
                    issue.assignee?.id === String(user?.id) && 'bg-muted border-primary/20'
                  )}
                  onClick={() => handleAssign(issue.id)}
                >
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <span className="font-medium truncate pr-4">{issue.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span
                        className={cn(
                          'px-1.5 py-0.5 rounded-full capitalize',
                          getStatusColor(issue.status)
                        )}
                      >
                        {issue.status.replace('_', ' ')}
                      </span>
                      <span>•</span>
                      <span className="uppercase">
                        {issue.priority === 1 ? 'High' : issue.priority === 2 ? 'Med' : 'Low'}
                      </span>
                      {issue.team && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-foreground/80">{issue.team.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {issue.assignee?.id === String(user?.id) && (
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  )}
                  {isUpdating && <Loader2 className="h-3 w-3 animate-spin shrink-0" />}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
