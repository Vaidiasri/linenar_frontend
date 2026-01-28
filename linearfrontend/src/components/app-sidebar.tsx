import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useLinearViewer } from '@/hooks/use-linear-viewer'
import { MOCK_TEAMS, MOCK_NAV_ITEMS } from '@/constants/mock-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: viewer } = useLinearViewer()

  const userData = React.useMemo(() => {
    if (!viewer) return { name: 'User', email: 'user@example.com', avatar: '' }
    return {
      name: viewer.name,
      email: viewer.email,
      avatar: viewer.avatar_url || '',
    }
  }, [viewer])

  return (
    <Sidebar collapsible="icon" className="dark border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={MOCK_TEAMS} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={MOCK_NAV_ITEMS} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="text-zinc-400 hover:text-zinc-100 transition-colors bg-transparent hover:bg-zinc-800 self-end md:self-start" />
        {viewer && <NavUser user={userData} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
