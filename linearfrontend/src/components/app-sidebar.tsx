import * as React from 'react'
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

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

// This is sample data.
const data = {
  teams: [
    {
      name: 'Linear Clone',
      logo: 'https://github.com/shadcn.png',
      plan: 'Enterprise',
    },
  ],
  navMain: [
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      isActive: true,
    },
    {
      title: 'My Issues',
      url: '#',
      icon: Home,
    },
    {
      title: 'Views',
      url: '#',
      icon: Calendar,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: viewer } = useLinearViewer()

  const userData = React.useMemo(() => {
    if (!viewer) return { name: 'User', email: 'user@example.com', avatar: '' }
    return {
      name: viewer.name,
      email: viewer.email,
      avatar: viewer.avatarUrl || '',
    }
  }, [viewer])

  return (
    <Sidebar collapsible="icon" className="dark border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="text-zinc-400 hover:text-zinc-100 transition-colors bg-transparent hover:bg-zinc-800 self-end md:self-start" />
        {viewer && <NavUser user={userData} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
