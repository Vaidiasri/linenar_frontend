import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

interface StatusChartProps {
  data: Record<string, number>
  isLoading?: boolean
}

// Status colors matching existing badge colors
const STATUS_COLORS: Record<string, string> = {
  backlog: '#6B7280', // Gray
  todo: '#3B82F6', // Blue
  in_progress: '#F59E0B', // Yellow
  done: '#10B981', // Green
  canceled: '#EF4444', // Red
}

// Status labels for display
const STATUS_LABELS: Record<string, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  in_progress: 'In Progress',
  done: 'Done',
  canceled: 'Canceled',
}

/**
 * Pie chart component for displaying issue status distribution
 */
export function StatusChart({ data, isLoading }: StatusChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-[250px] w-[250px] rounded-full" />
        </CardContent>
      </Card>
    )
  }

  // Transform data for Recharts
  const chartData = Object.entries(data).map(([status, count]) => ({
    name: STATUS_LABELS[status] || status,
    value: count,
    status,
  }))

  // Filter out zero values
  const filteredData = chartData.filter((item) => item.value > 0)

  if (filteredData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((entry) => (
                <Cell key={`cell-${entry.status}`} fill={STATUS_COLORS[entry.status] || '#999'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
