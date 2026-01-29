import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateProjectData, createProject } from '../api/project'
import { useTeams } from '../hooks/use-teams'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from './ui/sheet'
import { Plus } from 'lucide-react'

export function CreateProjectSheet() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [teamId, setTeamId] = useState('')

  const { data: teams } = useTeams()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      setOpen(false)
      setName('')
      setDescription('')
      setTeamId('')
    },
    onError: (error) => {
      console.error('Failed to create project', error)
      // Add toast notification later
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamId) return // Add validation
    mutation.mutate({ name, description, team_id: teamId })
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="hidden md:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Project</SheetTitle>
          <SheetDescription>Create a new project and assign it to a team.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="team">Team</Label>
            <select
              id="team"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a team
              </option>
              {teams?.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Project'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
