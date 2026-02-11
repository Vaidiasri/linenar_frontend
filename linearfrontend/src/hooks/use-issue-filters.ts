import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Issue } from '@/api/issue'

export interface IssueFilters {
  search: string
  status: string[]
  priority: number[]
  assigneeId: string[]
  teamId: string[]
  projectId: string[]
}

const DEFAULT_FILTERS: IssueFilters = {
  search: '',
  status: [],
  priority: [],
  assigneeId: [],
  teamId: [],
  projectId: [],
}

// Extract filter predicates for complexity 1
const matchesSearch = (issue: Issue, searchTerm: string): boolean => {
  if (!searchTerm) return true

  const searchLower = searchTerm.toLowerCase()
  return (
    issue.title.toLowerCase().includes(searchLower) ||
    issue.description?.toLowerCase().includes(searchLower) ||
    false
  )
}

const matchesStatus = (issue: Issue, statuses: string[]): boolean => {
  if (statuses.length === 0) return true
  return statuses.includes(issue.status)
}

const matchesPriority = (issue: Issue, priorities: number[]): boolean => {
  if (priorities.length === 0) return true
  return priorities.includes(issue.priority)
}

const matchesAssignee = (issue: Issue, assigneeIds: string[]): boolean => {
  if (assigneeIds.length === 0) return true
  if (!issue.assignee_id) return false
  return assigneeIds.includes(issue.assignee_id)
}

const matchesTeam = (issue: Issue, teamIds: string[]): boolean => {
  if (teamIds.length === 0) return true
  if (!issue.team_id) return false
  return teamIds.includes(issue.team_id)
}

const matchesProject = (issue: Issue, projectIds: string[]): boolean => {
  if (projectIds.length === 0) return true
  if (!issue.project_id) return false
  return projectIds.includes(issue.project_id)
}

export function useIssueFilters(issues: Issue[] | undefined) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<IssueFilters>(() => ({
    search: searchParams.get('search') || '',
    status: searchParams.getAll('status'),
    priority: searchParams.getAll('priority').map(Number),
    assigneeId: searchParams.getAll('assignee'),
    teamId: searchParams.getAll('team'),
    projectId: searchParams.getAll('project'),
  }))

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set('search', filters.search)
    filters.status.forEach((s) => params.append('status', s))
    filters.priority.forEach((p) => params.append('priority', String(p)))
    filters.assigneeId.forEach((a) => params.append('assignee', a))
    filters.teamId.forEach((t) => params.append('team', t))
    filters.projectId.forEach((p) => params.append('project', p))

    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  const filteredIssues = useMemo(() => {
    if (!issues) return []

    return issues.filter(
      (issue) =>
        matchesSearch(issue, filters.search) &&
        matchesStatus(issue, filters.status) &&
        matchesPriority(issue, filters.priority) &&
        matchesAssignee(issue, filters.assigneeId) &&
        matchesTeam(issue, filters.teamId) &&
        matchesProject(issue, filters.projectId)
    )
  }, [issues, filters])

  const updateFilter = <K extends keyof IssueFilters>(key: K, value: IssueFilters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.status.length > 0 ||
      filters.priority.length > 0 ||
      filters.assigneeId.length > 0 ||
      filters.teamId.length > 0 ||
      filters.projectId.length > 0
    )
  }, [filters])

  return {
    filters,
    filteredIssues,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  }
}
