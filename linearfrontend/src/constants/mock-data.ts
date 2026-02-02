import { Home, Folder, Users, Settings } from 'lucide-react'

export const MOCK_NAV_ITEMS = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: Folder,
  },
  {
    title: 'Teams',
    url: '/teams',
    icon: Users,
  },
  {
    title: 'Members',
    url: '/settings/members',
    icon: Settings,
  },
]
