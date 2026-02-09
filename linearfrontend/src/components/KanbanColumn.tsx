import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Issue } from '@/api/issue'
import { KanbanCard } from './KanbanCard'

interface KanbanColumnProps {
  id: string
  title: string
  issues: Issue[]
}

export function KanbanColumn({ id, title, issues }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  })

  return (
    <div
      ref={setNodeRef}
      className="flex h-full min-h-[500px] w-[350px] flex-col rounded-md bg-secondary/30 p-4"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {issues.length}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <KanbanCard key={issue.id} issue={issue} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
