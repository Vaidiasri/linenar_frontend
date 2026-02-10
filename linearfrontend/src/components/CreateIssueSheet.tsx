import { useState } from 'react'
import { useCreateIssueForm } from '@/hooks/use-create-issue-form'
import { useIssueFormData } from '@/hooks/use-issue-form-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'

export function CreateIssueSheet() {
  const [open, setOpen] = useState(false)
  const { formState, setters, handleSubmit, isPending } = useCreateIssueForm({
    onSuccess: () => setOpen(false),
  })
  const { teams, users, teamProjects, cycles } = useIssueFormData(formState.teamId)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Issue
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Create Issue</SheetTitle>
          <SheetDescription>Add a new issue to your board.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2 w-[90%] mx-auto">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Issue title"
              value={formState.title}
              onChange={(e) => setters.setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-[90%] mx-auto">
            <div className="space-y-2">
              <Label htmlFor="team">Team</Label>
              <Select value={formState.teamId} onValueChange={setters.setTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams?.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formState.status} onValueChange={(v: any) => setters.setStatus(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formState.priority} onValueChange={setters.setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Priority</SelectItem>
                  <SelectItem value="1">High</SelectItem>
                  <SelectItem value="2">Medium</SelectItem>
                  <SelectItem value="3">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select value={formState.assigneeId} onValueChange={setters.setAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={String(user.id)}>
                      {user.full_name || user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="project">Project (Optional)</Label>
              <Select
                value={formState.projectId}
                onValueChange={setters.setProjectId}
                disabled={!formState.teamId}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={formState.teamId ? 'Select project' : 'Select team first'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_project">No Project</SelectItem>
                  {teamProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="cycle">Cycle (Optional)</Label>
              <Select
                value={formState.cycleId}
                onValueChange={setters.setCycleId}
                disabled={!formState.teamId}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={formState.teamId ? 'Select cycle' : 'Select team first'}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_cycle">No Cycle</SelectItem>
                  {cycles?.map((cycle) => (
                    <SelectItem key={cycle.id} value={cycle.id}>
                      {cycle.name} {cycle.is_active ? '(Active)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 w-[90%] mx-auto">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description..."
              className="resize-none min-h-[100px]"
              value={formState.description}
              onChange={(e) => setters.setDescription(e.target.value)}
            />
          </div>

          <SheetFooter className="gap-2 sm:space-x-0">
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create Issue'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
