import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

export const MOCK_TEAMS = [
  {
    name: 'Linear Clone',
    logo: 'https://github.com/shadcn.png',
    plan: 'Enterprise',
  },
]

export const MOCK_NAV_ITEMS = [
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
]

export const MOCK_ISSUES: Array<{
  id: string
  title: string
  status: 'in-progress' | 'todo' | 'done'
  priority: 'high' | 'medium' | 'low'
  assignee: string
}> = [
  {
    id: 'LIN-42',
    title: 'Refactor sidebar navigation to support collapsible state',
    status: 'in-progress',
    priority: 'high',
    assignee: 'JD',
  },
  {
    id: 'LIN-45',
    title: 'Fix styling inconsistencies in mobile drawer',
    status: 'todo',
    priority: 'medium',
    assignee: 'JD',
  },
  {
    id: 'LIN-51',
    title: 'Write documentation for the new component library',
    status: 'done',
    priority: 'low',
    assignee: 'JD',
  },
]
