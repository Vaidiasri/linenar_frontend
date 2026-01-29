import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface PageLayoutProps {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}

export function PageLayout({ title, children, action }: PageLayoutProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2 px-4 md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex items-center gap-2 px-4 justify-between w-full">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          {action}
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-screen flex-1 rounded-xl md:min-h-min p-6">{children}</div>
      </div>
    </>
  )
}
