import React from 'react'
import { Menu as MenuIcon } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { IssueItem } from '@/components/issue-item'
import { MOCK_ISSUES } from '@/constants/mock-data'

export default function Dashboard() {
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger>
            <MenuIcon className="size-4" />
          </SidebarTrigger>
        </div>
        <div className="flex items-center gap-2 px-4">
          <span className="text-sm font-medium text-muted-foreground">My Issues</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today</h2>
              <span className="text-sm text-muted-foreground">Mon, Jan 27</span>
            </div>

            <div className="space-y-4">
              {MOCK_ISSUES.map((issue, index) => (
                <React.Fragment key={issue.id}>
                  <IssueItem
                    id={issue.id}
                    title={issue.title}
                    status={issue.status}
                    priority={issue.priority}
                    assignee={issue.assignee}
                  />
                  {index < MOCK_ISSUES.length - 1 && <div className="h-px bg-border/50" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
