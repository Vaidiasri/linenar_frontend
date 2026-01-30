import React, { useState } from 'react'
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
import { Mail, Plus } from 'lucide-react'

export function InviteUserSheet() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Placeholder handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inviting user:', email)
    // In future, call inviteUser mutation here
    setOpen(false)
    setEmail('')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Invite User
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Invite Member</SheetTitle>
          <SheetDescription>Invite a new member to your organization.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <div className="space-y-2 w-[90%] mx-auto">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="colleague@example.com"
                type="email"
                className="pl-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <SheetFooter className="gap-2 sm:space-x-0">
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Send Invitation</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
