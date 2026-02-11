import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { IssueFilters } from '@/hooks/use-issue-filters'
import { useTeams } from '@/hooks/use-teams'
import { useProjects } from '@/hooks/use-projects'
import { useUsers } from '@/hooks/use-users'

interface FilterPanelProps {
  filters: IssueFilters
  onFilterChange: <K extends keyof IssueFilters>(key: K, value: IssueFilters[K]) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

const STATUS_OPTIONS = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'Todo' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'canceled', label: 'Canceled' },
]

const PRIORITY_OPTIONS = [
  { value: 0, label: 'No Priority' },
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
]

export function FilterPanel({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}: FilterPanelProps) {
  const { data: teams = [] } = useTeams()
  const { data: projects = [] } = useProjects()
  const { data: users = [] } = useUsers()

  const toggleArrayFilter = <K extends keyof IssueFilters>(key: K, value: string | number) => {
    const currentValues = filters[key] as (string | number)[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    onFilterChange(key, newValues as IssueFilters[K])
  }

  const removeFilter = <K extends keyof IssueFilters>(key: K, value: string | number) => {
    const currentValues = filters[key] as (string | number)[]
    onFilterChange(key, currentValues.filter((v) => v !== value) as IssueFilters[K])
  }

  // Complexity 1: Use lookup table instead of if/else chain
  const getFilterLabel = (key: keyof IssueFilters, value: string | number): string => {
    const labelGetters = {
      status: () => STATUS_OPTIONS.find((o) => o.value === value)?.label || String(value),
      priority: () => PRIORITY_OPTIONS.find((o) => o.value === value)?.label || String(value),
      teamId: () => teams.find((t) => t.id === value)?.name || String(value),
      projectId: () => projects.find((p) => p.id === value)?.name || String(value),
      assigneeId: () => {
        const user = users.find((u) => u.id === value)
        return user?.full_name || user?.email || String(value)
      },
      search: () => String(value),
    }

    return labelGetters[key]()
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-1 px-1.5 py-0">
                  {filters.status.length +
                    filters.priority.length +
                    filters.assigneeId.length +
                    filters.teamId.length +
                    filters.projectId.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <ScrollArea className="h-[400px]">
              <div className="p-4 space-y-4">
                {/* Status Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Status</Label>
                  <div className="space-y-2">
                    {STATUS_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${option.value}`}
                          checked={filters.status.includes(option.value)}
                          onCheckedChange={() => toggleArrayFilter('status', option.value)}
                        />
                        <Label
                          htmlFor={`status-${option.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Priority Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Priority</Label>
                  <div className="space-y-2">
                    {PRIORITY_OPTIONS.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`priority-${option.value}`}
                          checked={filters.priority.includes(option.value)}
                          onCheckedChange={() => toggleArrayFilter('priority', option.value)}
                        />
                        <Label
                          htmlFor={`priority-${option.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Assignee Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Assignee</Label>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assignee-${user.id}`}
                          checked={filters.assigneeId.includes(user.id)}
                          onCheckedChange={() => toggleArrayFilter('assigneeId', user.id)}
                        />
                        <Label
                          htmlFor={`assignee-${user.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {user.full_name || user.email}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Team Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Team</Label>
                  <div className="space-y-2">
                    {teams.map((team) => (
                      <div key={team.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`team-${team.id}`}
                          checked={filters.teamId.includes(team.id)}
                          onCheckedChange={() => toggleArrayFilter('teamId', team.id)}
                        />
                        <Label
                          htmlFor={`team-${team.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {team.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Project Filter */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Project</Label>
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div key={project.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`project-${project.id}`}
                          checked={filters.projectId.includes(project.id)}
                          onCheckedChange={() => toggleArrayFilter('projectId', project.id)}
                        />
                        <Label
                          htmlFor={`project-${project.id}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {project.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status.map((status) => (
            <Badge key={`status-${status}`} variant="secondary" className="gap-1">
              {getFilterLabel('status', status)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('status', status)}
              />
            </Badge>
          ))}
          {filters.priority.map((priority) => (
            <Badge key={`priority-${priority}`} variant="secondary" className="gap-1">
              {getFilterLabel('priority', priority)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('priority', priority)}
              />
            </Badge>
          ))}
          {filters.assigneeId.map((assigneeId) => (
            <Badge key={`assignee-${assigneeId}`} variant="secondary" className="gap-1">
              {getFilterLabel('assigneeId', assigneeId)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('assigneeId', assigneeId)}
              />
            </Badge>
          ))}
          {filters.teamId.map((teamId) => (
            <Badge key={`team-${teamId}`} variant="secondary" className="gap-1">
              {getFilterLabel('teamId', teamId)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('teamId', teamId)}
              />
            </Badge>
          ))}
          {filters.projectId.map((projectId) => (
            <Badge key={`project-${projectId}`} variant="secondary" className="gap-1">
              {getFilterLabel('projectId', projectId)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeFilter('projectId', projectId)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
