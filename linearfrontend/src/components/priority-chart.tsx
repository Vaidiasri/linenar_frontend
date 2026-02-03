import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

interface PriorityChartProps {
  data: Record<string, number>
  isLoading?: boolean
}

// Priority colors
const PRIORITY_COLORS: Record<string, string> = {
  '0': '#9CA3AF', // No Priority - Gray
  '1': '#F87171', // High - Red
  '2': '#FB923C', // Medium - Orange
  '3': '#60A5FA', // Low - Blue
}

// Priority labels
const PRIORITY_LABELS: Record<string, string> = {
  '0': 'No Priority',
  '1': 'High',
  '2': 'Medium',
  '3': 'Low',
}

/**
 * Bar chart component for displaying priority distribution
 */
export function PriorityChart({ data, isLoading }: PriorityChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Skeleton className="h-[250px] w-full" />
        </CardContent>
      </Card>
    )
  }

  // Transform data for Recharts
  const chartData = Object.entries(data).map(([priority, count]) => ({
    name: PRIORITY_LABELS[priority] || `Priority ${priority}`,
    value: count,
    priority,
  }))

  // Sort by priority (High -> Medium -> Low -> No Priority)
  const sortedData = chartData.sort((a, b) => {
    const order = ['1', '2', '3', '0']
    return order.indexOf(a.priority) - order.indexOf(b.priority)
  })

  if (sortedData.every((item) => item.value === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Priority Distribution</CardTitle>
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
        <CardTitle>Priority Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {sortedData.map((entry) => (
                <Cell
                  key={`cell-${entry.priority}`}
                  fill={PRIORITY_COLORS[entry.priority] || '#999'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
