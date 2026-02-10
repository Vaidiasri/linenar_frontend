import { useGetIssueActivitiesQuery } from '@/store/api/endpoints/issues'
import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ActivityFeedProps {
  issueId: string
}

export function ActivityFeed({ issueId }: ActivityFeedProps) {
  const { data: activities, isLoading, error } = useGetIssueActivitiesQuery(issueId)

  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertDescription>Failed to load activity history</AlertDescription>
      </Alert>
    )
  }

  if (!activities?.length) {
    return null
  }

  return (
    <div className="space-y-0 mt-6 pt-6 border-t">
      <h3 className="text-sm font-medium mb-4 text-muted-foreground">Activity</h3>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
