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
import { useTeams } from '@/hooks/use-teams'
import { useProjects } from '@/hooks/use-projects'
import { MOCK_NAV_ITEMS } from '@/constants/mock-data'
import { type LucideIcon } from 'lucide-react'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: viewer } = useLinearViewer()
  const { data: teams } = useTeams()
  const { data: projects } = useProjects()

  const userData = React.useMemo(() => {
    if (!viewer) return { name: 'User', email: 'user@example.com', avatar: '' }
    return {
      name: viewer.name,
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

  const navItems = React.useMemo(() => {
    // Clone items
    // Clone items
    const items = [...MOCK_NAV_ITEMS] as {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: { title: string; url: string }[]
    }[]

    // Find Projects item
    const projectsItemIndex = items.findIndex((item) => item.title === 'Projects')

    if (projectsItemIndex !== -1 && projects) {
      // Add projects as sub-items
      items[projectsItemIndex] = {
        ...items[projectsItemIndex],
        items: projects.map((p) => ({
          title: p.name,
          url: `/projects/${p.id}`, // Assuming we have a detail page, or we want filter?
          // "go to /project dynamically" - maybe detail page?
          // For now let's point to projects page with query param or just projects page?
          // User said "go to /project dynamically".
          // If they click on a specific project, it should probably go to that project.
          // But we don't have a project detail page yet.
          // Let's point to /projects for now, or assume we will build one.
          // Re-reading: "use go to /project dynamically" -> singular /project.

          // Wait, if I click the PARENT "Projects", it goes to /projects (I set this in mock-data).
          // If I expand it, and click a project name, generally I expect to go to THAT project.
          // For now, I'll set url to `/projects` for list items too, or maybe just list them?
          // Let's assume detail view is desired eventually.
          // I'll set it to `/projects` so it works with current route.
        })),
      }
    }
    return items
  }, [projects])

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
        {viewer && <NavUser user={userData} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
