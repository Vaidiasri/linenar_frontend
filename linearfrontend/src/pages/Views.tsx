import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Disc, UserCircle, Clock } from 'lucide-react'

export default function Views() {
  const navigate = useNavigate()

  const views = [
    {
      id: 'my-issues',
      name: 'My Issues',
      description: 'Issues assigned to you',
      icon: Disc,
      color: 'text-indigo-500',
    },
    {
      id: 'created',
      name: 'Created by Me',
      description: 'Issues you created',
      icon: UserCircle,
      color: 'text-emerald-500',
    },
    {
      id: 'recent',
      name: 'Recently Updated',
      description: 'Issues updated recently',
      icon: Clock,
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center border-b px-4">
        <h1 className="text-sm font-medium">Views</h1>
      </header>
      <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full">
        {views.map((view) => (
          <Card
            key={view.id}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(`/views/${view.id}`)}
          >
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
              <view.icon className={`h-5 w-5 ${view.color}`} />
              <CardTitle className="text-base font-medium">{view.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{view.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
