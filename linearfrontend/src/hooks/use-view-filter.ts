import { useMemo } from 'react'
import { Issue } from '@/api/issue'
import { Disc, UserCircle, Clock, LucideIcon } from 'lucide-react'

interface Viewer {
  id: string
}

type ViewFilter = (issues: Issue[], viewer?: Viewer) => Issue[]

interface ViewConfig {
  title: string
  Icon: LucideIcon
  filter: ViewFilter
}

const VIEW_CONFIGS: Record<string, ViewConfig> = {
  'my-issues': {
    title: 'My Issues',
    Icon: Disc,
    filter: (issues, viewer) => (viewer ? issues.filter((i) => i.assignee_id === viewer.id) : []),
  },
  created: {
    title: 'Created by Me',
    Icon: UserCircle,
    filter: () => [], // Placeholder
  },
  recent: {
    title: 'Recently Updated',
    Icon: Clock,
    filter: (issues) =>
      [...issues].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      ),
  },
}

const DEFAULT_CONFIG: ViewConfig = {
  title: 'View',
  Icon: Disc,
  filter: (issues) => issues,
}

export function useViewFilter(viewId: string | undefined, issues: Issue[] | undefined, viewer: Viewer | undefined) {
  return useMemo(() => {
    const config = (viewId && VIEW_CONFIGS[viewId]) || DEFAULT_CONFIG
    const filteredIssues = issues ? config.filter(issues, viewer) : []
    
    return {
      title: config.title,
      Icon: config.Icon,
      filteredIssues,
    }
  }, [viewId, issues, viewer])
}
