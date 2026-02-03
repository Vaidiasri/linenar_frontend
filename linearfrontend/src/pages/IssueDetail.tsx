import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useIssueDetail } from '@/hooks/use-issue-detail'
import { useUpdateIssue } from '@/hooks/use-issues'
import { EditableField } from '@/components/editable-field'
import { PropertySelect, STATUS_OPTIONS, PRIORITY_OPTIONS } from '@/components/property-select'

// Type definitions for better type safety
type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled'
type IssuePriority = 0 | 1 | 2 | 3

interface ErrorConfig {
  title: string
  message: string
  showLoginButton: boolean
}

// Pure function to get error configuration
function getErrorConfig(is401: boolean, is404: boolean, error: Error): ErrorConfig {
  if (is401) {
    return {
      title: 'Authentication Error',
      message: 'Your session may have expired. Please try logging in again.',
      showLoginButton: true,
    }
  }

  if (is404) {
    return {
      title: 'Issue Not Found',
      message: "The issue you're looking for doesn't exist or has been deleted.",
      showLoginButton: false,
    }
  }

  return {
    title: 'Error Loading Issue',
    message: error.message,
    showLoginButton: false,
  }
}

// Helper function for login redirect
function handleLoginRedirect() {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: issue, isLoading, error } = useIssueDetail(id)
  const { mutate: updateIssue } = useUpdateIssue()

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const is401 = errorMessage.includes('401') || errorMessage.includes('Unauthorized')
    const is404 = errorMessage.includes('404') || errorMessage.includes('Not Found')

    return <ErrorState error={error} is401={is401} is404={is404} onBack={() => navigate('/')} />
  }

  if (!issue) {
    return <NotFoundState onBack={() => navigate('/')} />
  }

  // Generic update handler factory - eliminates code duplication
  const createUpdateHandler = (field: 'title' | 'description') => {
    return async (newValue: string) => {
      return new Promise<void>((resolve, reject) => {
        updateIssue(
          { id: id!, data: { [field]: newValue } },
          {
            onSuccess: () => resolve(),
            onError: (err) => reject(err),
          }
        )
      })
    }
  }

  const handleTitleUpdate = createUpdateHandler('title')
  const handleDescriptionUpdate = createUpdateHandler('description')

  const handleStatusChange = (newStatus: string) => {
    updateIssue({ id: id!, data: { status: newStatus as IssueStatus } })
  }

  const handlePriorityChange = (newPriority: string) => {
    updateIssue({ id: id!, data: { priority: parseInt(newPriority) as IssuePriority } })
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Header with Breadcrumb */}
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="h-8 gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-foreground" onClick={() => navigate('/')}>
            Dashboard
          </span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Issue #{id?.slice(0, 5).toUpperCase()}</span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Title Section - Editable */}
          <div>
            <EditableField
              value={issue.title}
              onSave={handleTitleUpdate}
              placeholder="Enter issue title..."
              className="text-3xl font-bold border-none shadow-none px-0"
            />
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <span className="font-mono">#{id?.slice(0, 8).toUpperCase()}</span>
              <span>•</span>
              <span>Created {new Date(issue.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description - Editable */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <EditableField
                value={issue.description || ''}
                onSave={handleDescriptionUpdate}
                placeholder="Add a description..."
                multiline
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Properties - Editable Dropdowns */}
          <Card>
            <CardHeader>
              <CardTitle>Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PropertyRow label="Status">
                <PropertySelect
                  value={issue.status}
                  onValueChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                />
              </PropertyRow>

              <PropertyRow label="Priority">
                <PropertySelect
                  value={issue.priority.toString()}
                  onValueChange={handlePriorityChange}
                  options={PRIORITY_OPTIONS}
                />
              </PropertyRow>

              <PropertyRow label="Assignee">
                <span className="text-sm">
                  {issue.assignee?.full_name || issue.assignee?.email || 'Unassigned'}
                </span>
              </PropertyRow>

              <PropertyRow label="Team">
                <span className="text-sm">{issue.team?.name || 'No team'}</span>
              </PropertyRow>
            </CardContent>
          </Card>

          {/* Activity Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">
                Comments and activity timeline coming in Phase 3...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="min-w-[200px]">{children}</div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-48" />
      </header>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  )
}

function ErrorState({
  error,
  is401,
  is404,
  onBack,
}: {
  error: Error
  is401?: boolean
  is404?: boolean
  onBack: () => void
}) {
  const errorConfig = getErrorConfig(is401 || false, is404 || false, error)

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold text-destructive">{errorConfig.title}</h2>
        <p className="text-muted-foreground">{errorConfig.message}</p>
        <div className="flex gap-2 justify-center">
          <Button onClick={onBack}>Back to Dashboard</Button>
          {errorConfig.showLoginButton && (
            <Button variant="outline" onClick={handleLoginRedirect}>
              Login Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Issue Not Found</h2>
        <p className="text-muted-foreground">The issue you're looking for doesn't exist.</p>
        <Button onClick={onBack}>Back to Dashboard</Button>
      </div>
    </div>
  )
}
