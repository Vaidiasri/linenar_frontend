/**
 * Dashboard statistics types matching backend API response
 */

export interface DashboardStats {
  status_counts: Record<string, number>
  priority_counts: Record<string, number>
  total_issues: number
  completed_issues: number
  progress_percentage: number
}

export interface StatusCount {
  status: string
  count: number
}

export interface PriorityCount {
  priority: number
  count: number
}
