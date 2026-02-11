import { useParams, useNavigate } from 'react-router-dom'
import { useGetIssuesQuery } from '@/store/api/endpoints/issues'
import { useLinearViewer } from '@/hooks/use-linear-viewer'
import { useViewFilter } from '@/hooks/use-view-filter'
import { useIssueFilters } from '@/hooks/use-issue-filters'
import { KanbanBoard } from '@/components/KanbanBoard'
import { SearchBar } from '@/components/search-bar'
import { FilterPanel } from '@/components/filter-panel'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ViewDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: viewer } = useLinearViewer()
  const { data: issues, isLoading } = useGetIssuesQuery()

  const { title, Icon, filteredIssues: viewFilteredIssues } = useViewFilter(id, issues, viewer)

  // Apply search and filters on top of view filters
  const { filters, filteredIssues, updateFilter, clearFilters, hasActiveFilters } =
    useIssueFilters(viewFilteredIssues)

  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-48 w-full" />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/views')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h1 className="text-lg font-semibold">{title}</h1>
      </header>

      <div className="border-b px-4 py-3 space-y-3">
        <SearchBar
          value={filters.search}
          onChange={(value) => updateFilter('search', value)}
          placeholder="Search issues..."
        />
        <FilterPanel
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="flex-1 overflow-x-auto p-4">
        <KanbanBoard issues={filteredIssues} />
      </div>
    </div>
  )
}
