import React from 'react'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Folder } from 'lucide-react'

interface PageLayoutProps {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}

export function PageLayout({ title, children, action }: PageLayoutProps) {
  return (
    <SidebarInset>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger>
            <Folder className="size-4" />
          </SidebarTrigger>
        </div>
        <div className="flex items-center gap-2 px-4 justify-between w-full">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {action}
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm h-full">
          <div className="p-6 space-y-6 h-full flex flex-col">{children}</div>
        </div>
      </div>
    </SidebarInset>
  )
}
