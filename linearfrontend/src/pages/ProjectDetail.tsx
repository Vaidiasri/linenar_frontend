import { useParams } from 'react-router-dom'
import { useGetProjectQuery, useGetIssuesQuery } from '@/store/api/apiSlice'
import { PageLayout } from '@/components/page-layout'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { IssueList } from '@/components/IssueList'
import { KanbanBoard } from '@/components/KanbanBoard'
import { ListIcon, KanbanIcon } from 'lucide-react'

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()

  const {
    data: project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useGetProjectQuery(projectId!, {
    skip: !projectId,
  })

  // Fetch issues filtered by project
  const { data: issues, isLoading: isIssuesLoading } = useGetIssuesQuery(
    { projectId: projectId! },
    {
      skip: !projectId,
    }
  )

  if (isProjectLoading) return <div className="p-8">Loading project details...</div>
  if (projectError) return <div className="p-8 text-red-500">Error loading project</div>
  if (!project) return <div className="p-8">Project not found</div>

  return (
    <PageLayout title={project.name}>
      <div className="flex flex-col gap-6">
        <Card className="border-none shadow-none bg-transparent">
          <p className="text-muted-foreground">
            {project.description || 'No description provided.'}
          </p>
        </Card>

        <Tabs defaultValue="board" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Issues</h3>
            <TabsList>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <ListIcon className="h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="board" className="flex items-center gap-2">
                <KanbanIcon className="h-4 w-4" />
                Board
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            {isIssuesLoading ? (
              <div className="py-10 text-center">Loading issues...</div>
            ) : (
              <IssueList issues={issues || []} />
            )}
          </TabsContent>

          <TabsContent value="board" className="h-[calc(100vh-250px)]">
            {isIssuesLoading ? (
              <div className="py-10 text-center">Loading board...</div>
            ) : (
              <KanbanBoard issues={issues || []} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
