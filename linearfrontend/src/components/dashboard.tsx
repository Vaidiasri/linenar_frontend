import React from 'react'
import { Menu as MenuIcon } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { IssueItem } from '@/components/issue-item'
import { CreateIssueSheet } from '@/components/CreateIssueSheet'
import { useIssues } from '@/hooks/use-issues'

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
  // Map backend status to frontend expected props if needed, or update IssueItem to accept all statuses
  // IssueItem likely expects 'todo' | 'in-progress' | 'done'.
  // Backend: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
  if (s === 'in_progress') return 'in-progress'
  if (s === 'done') return 'done'
  return 'todo' // Default fallbacks
}

export default function Dashboard() {
  const { data: issues, isLoading, error } = useIssues()
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger>
            <MenuIcon className="size-4" />
          </SidebarTrigger>
        </div>
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-muted-foreground mr-auto">My Issues</span>
          <CreateIssueSheet />
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
              ) : (
                issues?.map((issue, index) => (
                  <React.Fragment key={issue.id}>
                    <IssueItem
                      id={issue.id}
                      title={issue.title}
                      status={getStatusLabel(issue.status)}
                      priority={getPriorityLabel(issue.priority)}
                      // Handle potentially missing assignee safely
                      assignee={
                        issue.assignee
                          ? (issue.assignee.full_name || issue.assignee.email)
                              .substring(0, 2)
                              .toUpperCase()
                          : 'UN'
                      }
                    />
                    {issues && index < issues.length - 1 && <div className="h-px bg-border/50" />}
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
