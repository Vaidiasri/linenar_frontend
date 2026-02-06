import { useState } from 'react'
import { useCreateTeam } from '@/hooks/use-teams'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Plus } from 'lucide-react'

export function CreateTeamSheet() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [key, setKey] = useState('')

  const mutation = useCreateTeam()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await mutation.mutate({ name, key }).unwrap()
      setOpen(false)
      setName('')
      setKey('')
    } catch (error) {
      console.error('Failed to create team', error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="hidden md:flex">
          <Plus className="mr-2 h-4 w-4" />
          New Team
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Create Team</SheetTitle>
          <SheetDescription>Create a new team for your organization.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2 w-[90%] mx-auto">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Team name (e.g. Engineering)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2 w-[90%] mx-auto">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              placeholder="Team key (e.g. ENG)"
              value={key}
              onChange={(e) => setKey(e.target.value.toUpperCase())}
              required
              maxLength={5}
            />
          </div>
          <SheetFooter className="gap-2 sm:space-x-0">
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Creating...' : 'Create Team'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
