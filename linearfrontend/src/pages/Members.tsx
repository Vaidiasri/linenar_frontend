import { useState } from 'react'
import { MoreHorizontal, Trash, UserPlus } from 'lucide-react'

import { useUsers, useDeleteUser } from '@/hooks/use-users'
import { PageLayout } from '@/components/page-layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InviteUserSheet } from '@/components/InviteUserSheet'
import { AssignIssueDialog } from '@/components/assign-issue-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { User } from '@/types/user'

export default function Members() {
  const { data: users, isLoading, error } = useUsers()
  const { mutate: deleteUser } = useDeleteUser()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  if (isLoading) return <div className="p-8">Loading members...</div>
  if (error) return <div className="p-8 text-red-500">Error loading members</div>

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

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
                className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>{user.full_name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{user.full_name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedUser(user)
                          setIsAssignDialogOpen(true)
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign to Issue
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setUserToDelete(user)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assign Issue Dialog */}
      {selectedUser && (
        <AssignIssueDialog
          user={selectedUser}
          open={isAssignDialogOpen}
          onOpenChange={setIsAssignDialogOpen}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              <span className="font-semibold text-foreground"> {userToDelete?.full_name} </span>
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteUser}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  )
}
