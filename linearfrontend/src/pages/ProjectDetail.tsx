import { useParams } from 'react-router-dom'
import { useGetProjectQuery } from '@/store/api/apiSlice'
import { PageLayout } from '@/components/page-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()

  const {
    data: project,
    isLoading,
    error,
  } = useGetProjectQuery(projectId!, {
    skip: !projectId,
  })

  if (isLoading) return <div className="p-8">Loading project details...</div>
  if (error) return <div className="p-8 text-red-500">Error loading project</div>
  if (!project) return <div className="p-8">Project not found</div>

  return (
    <PageLayout title="Project Detail">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{project.name}</h2>
          {/* Breadcrumb or Back button could go here? */}
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>About this Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{project.description || 'No description provided.'}</p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
