'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core'
import { createPortal } from 'react-dom'

import { Issue } from '@/api/issue'
import { useUpdateIssue } from '@/hooks/use-issues'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'

interface KanbanBoardProps {
  issues: Issue[]
}

const defaultCols = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'Todo' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
  { id: 'canceled', title: 'Canceled' },
]

export function KanbanBoard({ issues }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { mutate: updateIssue } = useUpdateIssue()

  // Group issues by status
  const issuesByStatus = useMemo(() => {
    const map: Record<string, Issue[]> = {}
    defaultCols.forEach((col) => (map[col.id] = []))
    issues.forEach((issue) => {
      const status = issue.status.toLowerCase().replace(' ', '_')
      if (map[status]) {
        map[status].push(issue)
      } else {
        // Fallback for unknown statuses
        if (!map['backlog']) map['backlog'] = []
        map['backlog'].push(issue)
      }
    })
    return map
  }, [issues])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId !== overId) {
      // Find the issue and its new status
      const issue = issues.find((i) => i.id === activeId)
      if (issue) {
        // Determine new status based on drop target (column or card)
        // This logic is simplified; real DnD usually handles reordering AND status change
        // For now, we assume dropping onto a column or card changes status

        // Find which column the overId belongs to
        let newStatus = ''
        // Check if overId is a column ID
        if (defaultCols.find((c) => c.id === overId)) {
          newStatus = overId
        } else {
          // Over is a card, find its status
          const overIssue = issues.find((i) => i.id === overId)
          if (overIssue) {
            newStatus = overIssue.status.toLowerCase().replace(' ', '_')
          }
        }

        if (newStatus && newStatus !== issue.status) {
          const validStatuses = ['backlog', 'todo', 'in_progress', 'done', 'canceled'] as const
          if (validStatuses.includes(newStatus as any)) {
            updateIssue({
              id: issue.id,
              data: { status: newStatus as (typeof validStatuses)[number] },
            })
          }
        }
      }
    }

    setActiveId(null)
  }

  const activeIssue = useMemo(() => issues.find((i) => i.id === activeId), [activeId, issues])

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {defaultCols.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            issues={issuesByStatus[col.id] || []}
          />
        ))}
      </div>
      {createPortal(
        <DragOverlay>{activeIssue && <KanbanCard issue={activeIssue} />}</DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
