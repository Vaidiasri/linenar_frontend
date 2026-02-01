import React, { useState, useMemo } from 'react'
import { Menu as MenuIcon, Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { IssueItem } from '@/components/issue-item'
import { CreateIssueSheet } from '@/components/CreateIssueSheet'
import { useIssues } from '@/hooks/use-issues'
import { Input } from '@/components/ui/input'

const getPriorityLabel = (p: number) => {
  switch (p) {
    case 1:
      return 'high'
    case 2:
      return 'medium'
    case 3:
      return 'low'
    default:
      return 'low' // Default or No Priority
  }
}

const getStatusLabel = (s: string): 'todo' | 'in-progress' | 'done' => {
  if (s === 'in_progress') return 'in-progress'
  if (s === 'done') return 'done'
  return 'todo'
}

const getAssigneeInitials = (
  assignee: { full_name?: string; email: string } | null | undefined
) => {
  if (!assignee) return 'UN'
  const name = assignee.full_name || assignee.email
  return name.substring(0, 2).toUpperCase()
}

export default function Dashboard() {
  const { data: issues, isLoading, error } = useIssues()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredIssues = useMemo(() => {
    if (!issues) return []
    const lowerQuery = searchQuery.toLowerCase()
    return issues.filter((issue) => issue.title.toLowerCase().includes(lowerQuery))
  }, [issues, searchQuery])

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger>
            <MenuIcon className="size-4" />
          </SidebarTrigger>
        </div>
        <div className="flex items-center gap-2 px-4 w-full">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            My Issues
          </span>
          <div className="relative w-full max-w-sm ml-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
          <div className="ml-auto">
            <CreateIssueSheet />
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4 overflow-y-auto">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today</h2>
              <span className="text-sm text-muted-foreground">Mon, Jan 27</span>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div>Loading issues...</div>
              ) : error ? (
                <div>Error loading issues</div>
              ) : filteredIssues.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-8">
                  No issues found matching "{searchQuery}"
                </div>
              ) : (
                filteredIssues.map((issue, index) => (
                  <React.Fragment key={issue.id}>
                    <IssueItem
                      id={issue.id}
                      title={issue.title}
                      status={getStatusLabel(issue.status)}
                      priority={getPriorityLabel(issue.priority)}
                      assignee={getAssigneeInitials(issue.assignee)}
                    />
                    {index < filteredIssues.length - 1 && <div className="h-px bg-border/50" />}
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
