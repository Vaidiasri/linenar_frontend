import { Home, Folder, Users, Settings, RotateCw, LayoutList } from 'lucide-react'

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
    title: 'Views',
    url: '/views',
    icon: LayoutList,
  },
  {
    title: 'Teams',
    url: '/teams',
    icon: Users,
  },
  {
    title: 'Cycles',
    url: '/cycles',
    icon: RotateCw,
  },
  {
    title: 'Members',
    url: '/settings/members',
    icon: Settings,
  },
]
