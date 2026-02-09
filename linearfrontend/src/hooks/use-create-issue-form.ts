import { useState } from 'react'
import { useCreateIssue } from '@/hooks/use-issues'

interface UseCreateIssueFormProps {
  onSuccess?: () => void
}

export function useCreateIssueForm({ onSuccess }: UseCreateIssueFormProps = {}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<'backlog' | 'todo' | 'in_progress' | 'done'>('todo')
  const [priority, setPriority] = useState<string>('0')
  const [teamId, setTeamId] = useState<string>('')
  const [assigneeId, setAssigneeId] = useState<string>('')
  const [projectId, setProjectId] = useState<string>('')

  const mutation = useCreateIssue()

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setStatus('todo')
    setPriority('0')
    setTeamId('')
    setAssigneeId('')
    setProjectId('')
  }

  const handleTeamChange = (val: string) => {
    setTeamId(val)
    setProjectId('') // Reset project when team changes
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title) return
    if (!teamId) return

    try {
      await mutation
        .mutate({
          title,
          description,
          status,
          priority: parseInt(priority) as 0 | 1 | 2 | 3,
          team_id: teamId,
          assignee_id: assigneeId || undefined,
          project_id: projectId && projectId !== 'no_project' ? projectId : undefined,
        })
        .unwrap()

      onSuccess?.()
      resetForm()
    } catch (error) {
      console.error('Failed to create issue', error)
    }
  }

  return {
    formState: {
      title,
      description,
      status,
      priority,
      teamId,
      assigneeId,
      projectId,
    },
    setters: {
      setTitle,
      setDescription,
      setStatus,
      setPriority,
      setTeamId: handleTeamChange,
      setAssigneeId,
      setProjectId,
    },
    handleSubmit,
    isPending: mutation.isPending,
  }
}
