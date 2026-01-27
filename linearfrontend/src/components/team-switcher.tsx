import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: string
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors w-full"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Avatar className="size-4 rounded-[2px]">
          <AvatarImage src={activeTeam.logo} alt={activeTeam.name} />
          <AvatarFallback className="rounded-[2px] bg-transparent text-[10px]">LC</AvatarFallback>
        </Avatar>
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold text-sidebar-foreground">{activeTeam.name}</span>
        <span className="truncate text-xs text-muted-foreground">{activeTeam.plan}</span>
      </div>
      <ChevronDown className="ml-auto" />
    </SidebarMenuButton>
  )
}
