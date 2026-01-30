import { useUsers } from '@/hooks/use-users'
import { PageLayout } from '@/components/page-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InviteUserSheet } from '@/components/InviteUserSheet'

export default function Members() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) return <div className="p-8">Loading members...</div>
  if (error) return <div className="p-8 text-red-500">Error loading members</div>

  return (
    <PageLayout title="Members" action={<InviteUserSheet />}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Organization Members</h2>
          <p className="text-sm text-muted-foreground">Manage who has access to your workspace.</p>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
