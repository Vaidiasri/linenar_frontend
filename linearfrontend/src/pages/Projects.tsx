import { useQuery } from '@tanstack/react-query'
import { getProjects } from '../api/project'
import { CreateProjectSheet } from '../components/CreateProjectSheet'
import { PageLayout } from '@/components/page-layout'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Link } from 'react-router-dom'

export default function Projects() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  })

  if (isLoading) return <div className="p-8">Loading projects...</div>
  if (error) return <div className="p-8 text-red-500">Error loading projects</div>

  return (
    <PageLayout title="Projects" action={<CreateProjectSheet />}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">All Projects</h2>
          <p className="text-sm text-muted-foreground">Manage your projects.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects?.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-10">
            No projects found. Create one to get started.
          </div>
        )}
        {projects?.map((project) => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description || 'No description'}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </PageLayout>
  )
}
