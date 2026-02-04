import { createContext, useContext, useEffect, ReactNode } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useSocket } from '@/hooks/use-socket'

// WebSocket URL derivation
const WS_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/ws'

interface SocketContextType {
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({ isConnected: false })

export const useSocketContext = () => useContext(SocketContext)

interface SocketProviderProps {
  children: ReactNode
}

export function SocketProvider({ children }: SocketProviderProps) {
  const token = localStorage.getItem('access_token')
  const { isConnected, lastMessage } = useSocket(WS_URL, token)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data)
        const eventType = data.event

        // Handle different event types
        switch (eventType) {
          case 'ISSUE_CREATED':
            queryClient.invalidateQueries({ queryKey: ['issues'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
            toast.success(`New issue created: ${data.title}`)
            break

          case 'ISSUE_UPDATED':
            queryClient.invalidateQueries({ queryKey: ['issues'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
            if (data.issue_id) {
              queryClient.invalidateQueries({ queryKey: ['issue', data.issue_id] })
            }
            toast.info(`Issue updated: ${data.title}`)
            break

          case 'ISSUE_DELETED':
            queryClient.invalidateQueries({ queryKey: ['issues'] })
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
            toast.error(`Issue deleted: ${data.title}`)
            break

          default:
            console.log('Unknown event:', eventType)
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }
  }, [lastMessage, queryClient])

  return <SocketContext.Provider value={{ isConnected }}>{children}</SocketContext.Provider>
}
