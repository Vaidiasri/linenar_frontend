import * as React from 'react'

import { NavMain, NavItem } from '@/components/nav-main'
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
import { NotificationsPopover } from '@/components/notifications-popover'
import { useLinearViewer } from '@/hooks/use-linear-viewer'
import { useTeams } from '@/hooks/use-teams'
import { useProjects } from '@/hooks/use-projects'
import { useUsers } from '@/hooks/use-users'
import { MOCK_NAV_ITEMS } from '@/constants/mock-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: viewer } = useLinearViewer()
  const { data: teams } = useTeams()
  const { data: projects } = useProjects()
  const { data: users } = useUsers()

  const userData = React.useMemo(() => {
    if (!viewer) return { name: 'User', email: 'user@example.com', avatar: '' }
    return {
      name: viewer.full_name,
      email: viewer.email,
      avatar: viewer.avatar_url || '',
    }
  }, [viewer])

  const formattedTeams = React.useMemo(() => {
    if (!teams) return []
    return teams.map((team) => ({
      name: team.name,
      logo: 'https://github.com/shadcn.png', // Placeholder logo
      plan: team.key, // Using key as plan for now
    }))
  }, [teams])

  // Helper to populate nav items
  const populateNavItem = <T,>(
    items: NavItem[],
    title: string,
    data: T[] | undefined,
    mapFn: (item: T) => { title: string; url: string }
  ) => {
    const index = items.findIndex((item) => item.title === title)
    if (index !== -1 && data) {
      items[index] = {
        ...items[index],
        items: data.map(mapFn),
      }
    }
  }

  const navItems = React.useMemo(() => {
    const items = [...MOCK_NAV_ITEMS] as NavItem[]

    populateNavItem(items, 'Projects', projects, (p) => ({
      title: p.name,
      url: `/projects/${p.id}`,
    }))

    populateNavItem(items, 'Teams', teams, (t) => ({
      title: t.name,
      url: `/teams?id=${t.id}`,
    }))

    populateNavItem(items, 'Members', users, (u) => ({
      title: u.full_name || u.email,
      url: `/settings/members`,
    }))

    return items
  }, [projects, teams, users])

  return (
    <Sidebar collapsible="icon" className="dark border-r-0" {...props}>
      <SidebarHeader>
        {formattedTeams.length > 0 && <TeamSwitcher teams={formattedTeams} />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger className="text-zinc-400 hover:text-zinc-100 transition-colors bg-transparent hover:bg-zinc-800 self-end md:self-start" />
        {viewer && (
          <div className="flex items-center gap-2">
            <NotificationsPopover />
            <NavUser user={userData} />
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
