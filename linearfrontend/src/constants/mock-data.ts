import { Home, Folder } from 'lucide-react'

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
